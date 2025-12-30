import { Severity } from '../value-objects/Severity.js';
import { CodeExample } from '../value-objects/CodeExample.js';
import { PRReference } from '../value-objects/PRReference.js';
/**
 * 知見エンティティ
 * タイトルをベースにした一意性を持つ
 */
export declare class KnowledgeItem {
    private title;
    private severity;
    private occurrences;
    private summary;
    private recommendation;
    private codeExample;
    private targetFile;
    private references;
    private constructor();
    /**
     * ファクトリーメソッド: 新規知見を作成
     */
    static create(params: {
        title: string;
        severity?: string;
        summary: string;
        recommendation: string;
        code_example?: {
            bad?: string;
            good?: string;
        };
        file_path?: string;
        pr_url?: string;
    }): KnowledgeItem;
    /**
     * ファクトリーメソッド: Markdownからのデシリアライズ用
     * 発生回数と複数のPR参照を保持した状態で復元
     */
    static fromSerialized(params: {
        title: string;
        severity?: string;
        summary: string;
        recommendation: string;
        occurrences: number;
        code_example?: {
            bad?: string;
            good?: string;
        };
        file_path?: string;
        pr_urls?: string[];
    }): KnowledgeItem;
    /**
     * 既存知見とマージ（発生回数増加、PR参照追加）
     */
    merge(params: {
        pr_url?: string;
    }): void;
    getTitle(): string;
    getSeverity(): Severity;
    getOccurrences(): number;
    getSummary(): string;
    getRecommendation(): string;
    getCodeExample(): CodeExample;
    getTargetFile(): string;
    getReferences(): readonly PRReference[];
    /**
     * Markdown出力用のプレーンオブジェクトに変換
     */
    toPlainObject(): {
        title: string;
        severity: string;
        occurrences: number;
        summary: string;
        recommendation: string;
        codeExample: {
            bad: string;
            good: string;
        };
        targetFile: string;
        references: string[];
    };
}
//# sourceMappingURL=KnowledgeItem.d.ts.map