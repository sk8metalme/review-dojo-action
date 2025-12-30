import { KnowledgeQuery } from '../../domain/value-objects/KnowledgeQuery.js';
import { Language } from '../../domain/value-objects/Language.js';
/**
 * PRチェックリスト生成Use Case
 */
export class GeneratePRChecklistUseCase {
    repository;
    searchService;
    constructor(repository, searchService) {
        this.repository = repository;
        this.searchService = searchService;
    }
    async execute(params) {
        const { filePaths, languages, severityFilter } = params;
        // ファイルパスから言語を推定（languagesが指定されていない場合）
        const detectedLanguages = languages || this.detectLanguages(filePaths);
        // すべての知見を取得
        const allKnowledge = await this.repository.findAll();
        // 各言語ごとに検索
        const allChecklistItems = [];
        for (const language of detectedLanguages) {
            // クエリ作成（言語でフィルタ、重要度でフィルタ）
            const query = KnowledgeQuery.create({
                language,
                severity: severityFilter,
                maxResults: 20 // チェックリストは最大20件
            });
            const results = this.searchService.search(allKnowledge, query);
            // チェックリストアイテムに変換
            for (const result of results) {
                const id = this.searchService.generateId(result.category, result.language, result.item);
                // タイトルをチェック項目形式に変換
                const checkItem = this.convertToCheckItem(result.item.getTitle());
                allChecklistItems.push({
                    category: result.category,
                    severity: result.item.getSeverity().getValue(),
                    title: result.item.getTitle(),
                    checkItem,
                    knowledgeId: id
                });
            }
        }
        // 重要度でソート（critical > warning > info）
        allChecklistItems.sort((a, b) => {
            const severityOrder = {
                critical: 3,
                warning: 2,
                info: 1
            };
            const aSeverity = severityOrder[a.severity] || 0;
            const bSeverity = severityOrder[b.severity] || 0;
            return bSeverity - aSeverity;
        });
        // サマリー生成
        const summary = this.generateSummary(allChecklistItems, detectedLanguages);
        return {
            checklist: allChecklistItems,
            summary
        };
    }
    /**
     * ファイルパスから言語を推定
     */
    detectLanguages(filePaths) {
        const languageSet = new Set();
        for (const filePath of filePaths) {
            const ext = filePath.split('.').pop()?.toLowerCase();
            if (!ext)
                continue;
            const language = Language.fromExtension(ext);
            languageSet.add(language.getValue());
        }
        return Array.from(languageSet);
    }
    /**
     * タイトルをチェック項目形式に変換
     * 例: "SQLインジェクション対策" → "SQLインジェクション対策を実施しましたか？"
     */
    convertToCheckItem(title) {
        // すでに疑問形の場合はそのまま返す
        if (title.endsWith('?') || title.endsWith('？')) {
            return title;
        }
        // 「〜対策」の場合
        if (title.includes('対策')) {
            return `${title}を実施しましたか？`;
        }
        // 「〜確認」の場合
        if (title.includes('確認')) {
            return `${title}を行いましたか？`;
        }
        // その他の場合
        return `${title}を確認しましたか？`;
    }
    /**
     * サマリー生成
     */
    generateSummary(items, languages) {
        const criticalCount = items.filter(item => item.severity === 'critical').length;
        const warningCount = items.filter(item => item.severity === 'warning').length;
        const infoCount = items.filter(item => item.severity === 'info').length;
        const parts = [];
        parts.push(`対象言語: ${languages.join(', ')}`);
        parts.push(`チェック項目数: ${items.length}件`);
        if (criticalCount > 0) {
            parts.push(`重要: ${criticalCount}件`);
        }
        if (warningCount > 0) {
            parts.push(`警告: ${warningCount}件`);
        }
        if (infoCount > 0) {
            parts.push(`情報: ${infoCount}件`);
        }
        return parts.join(' | ');
    }
}
//# sourceMappingURL=GeneratePRChecklistUseCase.js.map