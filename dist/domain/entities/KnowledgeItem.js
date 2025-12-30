import { Severity } from '../value-objects/Severity.js';
import { CodeExample } from '../value-objects/CodeExample.js';
import { PRReference } from '../value-objects/PRReference.js';
import { SensitiveInfoMasker } from '../services/SensitiveInfoMasker.js';
/**
 * 知見エンティティ
 * タイトルをベースにした一意性を持つ
 */
export class KnowledgeItem {
    title;
    severity;
    occurrences;
    summary;
    recommendation;
    codeExample;
    targetFile;
    references;
    constructor(title, severity, occurrences, summary, recommendation, codeExample, targetFile, references) {
        this.title = title;
        this.severity = severity;
        this.occurrences = occurrences;
        this.summary = summary;
        this.recommendation = recommendation;
        this.codeExample = codeExample;
        this.targetFile = targetFile;
        this.references = references;
    }
    /**
     * ファクトリーメソッド: 新規知見を作成
     */
    static create(params) {
        const masker = new SensitiveInfoMasker();
        // 機密情報をマスク
        const maskedSummary = masker.mask(params.summary);
        const maskedRecommendation = masker.mask(params.recommendation);
        const severity = params.severity
            ? Severity.fromString(params.severity)
            : Severity.info();
        const codeExample = params.code_example
            ? CodeExample.create(params.code_example.bad, params.code_example.good)
            : CodeExample.empty();
        const references = [];
        if (params.pr_url) {
            try {
                references.push(PRReference.create(params.pr_url));
            }
            catch (error) {
                // PR URLが不正な場合はスキップ（ログ出力のみ）
                console.warn(`Invalid PR URL: ${params.pr_url}`, error);
            }
        }
        return new KnowledgeItem(params.title, severity, 1, // 初回は1回発生
        maskedSummary, maskedRecommendation, codeExample, params.file_path || '', references);
    }
    /**
     * ファクトリーメソッド: Markdownからのデシリアライズ用
     * 発生回数と複数のPR参照を保持した状態で復元
     */
    static fromSerialized(params) {
        const masker = new SensitiveInfoMasker();
        // 機密情報をマスク
        const maskedSummary = masker.mask(params.summary);
        const maskedRecommendation = masker.mask(params.recommendation);
        const severity = params.severity
            ? Severity.fromString(params.severity)
            : Severity.info();
        const codeExample = params.code_example
            ? CodeExample.create(params.code_example.bad, params.code_example.good)
            : CodeExample.empty();
        const references = [];
        if (params.pr_urls) {
            for (const url of params.pr_urls) {
                try {
                    references.push(PRReference.create(url));
                }
                catch (error) {
                    console.warn(`Invalid PR URL during deserialization: ${url}`, error);
                }
            }
        }
        return new KnowledgeItem(params.title, severity, params.occurrences, // デシリアライズ時は元の発生回数を保持
        maskedSummary, maskedRecommendation, codeExample, params.file_path || '', references);
    }
    /**
     * 既存知見とマージ（発生回数増加、PR参照追加）
     */
    merge(params) {
        this.occurrences++;
        if (params.pr_url) {
            try {
                const newRef = PRReference.create(params.pr_url);
                // 重複チェック
                const alreadyExists = this.references.some(ref => ref.equals(newRef));
                if (!alreadyExists) {
                    this.references.push(newRef);
                }
            }
            catch (error) {
                console.warn(`Invalid PR URL during merge: ${params.pr_url}`, error);
            }
        }
    }
    // Getters
    getTitle() {
        return this.title;
    }
    getSeverity() {
        return this.severity;
    }
    getOccurrences() {
        return this.occurrences;
    }
    getSummary() {
        return this.summary;
    }
    getRecommendation() {
        return this.recommendation;
    }
    getCodeExample() {
        return this.codeExample;
    }
    getTargetFile() {
        return this.targetFile;
    }
    getReferences() {
        return [...this.references];
    }
    /**
     * Markdown出力用のプレーンオブジェクトに変換
     */
    toPlainObject() {
        return {
            title: this.title,
            severity: this.severity.getValue(),
            occurrences: this.occurrences,
            summary: this.summary,
            recommendation: this.recommendation,
            codeExample: {
                bad: this.codeExample.getBad(),
                good: this.codeExample.getGood()
            },
            targetFile: this.targetFile,
            references: this.references.map(ref => ref.getUrl())
        };
    }
}
//# sourceMappingURL=KnowledgeItem.js.map