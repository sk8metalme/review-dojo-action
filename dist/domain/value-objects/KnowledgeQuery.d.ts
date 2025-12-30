/**
 * 知見検索クエリ
 * 検索条件を表すValue Object
 */
export declare class KnowledgeQuery {
    private readonly queryText;
    private readonly category;
    private readonly language;
    private readonly severity;
    private readonly filePath;
    private readonly maxResults;
    private constructor();
    /**
     * ファクトリーメソッド: 検索クエリを作成
     */
    static create(params: {
        query?: string;
        category?: string;
        language?: string;
        severity?: string;
        filePath?: string;
        maxResults?: number;
    }): KnowledgeQuery;
    /**
     * 全件検索（フィルタなし）のクエリを作成
     */
    static all(maxResults?: number): KnowledgeQuery;
    getQueryText(): string | undefined;
    getCategory(): string | undefined;
    getLanguage(): string | undefined;
    getSeverity(): string | undefined;
    getFilePath(): string | undefined;
    getMaxResults(): number;
    /**
     * クエリが空かどうか（フィルタ条件が一つもない）
     */
    isEmpty(): boolean;
    /**
     * カテゴリフィルタが設定されているか
     */
    hasCategoryFilter(): boolean;
    /**
     * 言語フィルタが設定されているか
     */
    hasLanguageFilter(): boolean;
    /**
     * 重要度フィルタが設定されているか
     */
    hasSeverityFilter(): boolean;
    /**
     * ファイルパスフィルタが設定されているか
     */
    hasFilePathFilter(): boolean;
    /**
     * テキスト検索クエリが設定されているか
     */
    hasQueryText(): boolean;
}
//# sourceMappingURL=KnowledgeQuery.d.ts.map