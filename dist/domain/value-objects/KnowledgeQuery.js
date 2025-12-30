/**
 * 知見検索クエリ
 * 検索条件を表すValue Object
 */
export class KnowledgeQuery {
    queryText;
    category;
    language;
    severity;
    filePath;
    maxResults;
    constructor(queryText, category, language, severity, filePath, maxResults) {
        this.queryText = queryText;
        this.category = category;
        this.language = language;
        this.severity = severity;
        this.filePath = filePath;
        this.maxResults = maxResults;
    }
    /**
     * ファクトリーメソッド: 検索クエリを作成
     */
    static create(params) {
        const maxResults = params.maxResults && params.maxResults > 0
            ? params.maxResults
            : 10; // デフォルト10件
        return new KnowledgeQuery(params.query?.trim(), params.category?.trim(), params.language?.trim(), params.severity?.trim(), params.filePath?.trim(), maxResults);
    }
    /**
     * 全件検索（フィルタなし）のクエリを作成
     */
    static all(maxResults = 100) {
        return new KnowledgeQuery(undefined, undefined, undefined, undefined, undefined, maxResults);
    }
    // Getters
    getQueryText() {
        return this.queryText;
    }
    getCategory() {
        return this.category;
    }
    getLanguage() {
        return this.language;
    }
    getSeverity() {
        return this.severity;
    }
    getFilePath() {
        return this.filePath;
    }
    getMaxResults() {
        return this.maxResults;
    }
    /**
     * クエリが空かどうか（フィルタ条件が一つもない）
     */
    isEmpty() {
        return !this.queryText
            && !this.category
            && !this.language
            && !this.severity
            && !this.filePath;
    }
    /**
     * カテゴリフィルタが設定されているか
     */
    hasCategoryFilter() {
        return !!this.category;
    }
    /**
     * 言語フィルタが設定されているか
     */
    hasLanguageFilter() {
        return !!this.language;
    }
    /**
     * 重要度フィルタが設定されているか
     */
    hasSeverityFilter() {
        return !!this.severity;
    }
    /**
     * ファイルパスフィルタが設定されているか
     */
    hasFilePathFilter() {
        return !!this.filePath;
    }
    /**
     * テキスト検索クエリが設定されているか
     */
    hasQueryText() {
        return !!this.queryText;
    }
}
//# sourceMappingURL=KnowledgeQuery.js.map