/**
 * 類似知見判定のインターフェース（Strategy Pattern）
 * 将来的に異なる判定アルゴリズムに差し替え可能
 */
export interface KnowledgeInput {
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
}
export interface HasTitle {
    getTitle(): string;
}
export interface IKnowledgeMatcher {
    /**
     * 新しい知見に類似する既存知見を検索
     * @param newItem 新しい知見
     * @param existing 既存知見のリスト
     * @returns 類似知見が見つかればそれを、なければnull
     */
    findSimilar<T extends HasTitle>(newItem: KnowledgeInput, existing: T[]): T | null;
}
//# sourceMappingURL=IKnowledgeMatcher.d.ts.map