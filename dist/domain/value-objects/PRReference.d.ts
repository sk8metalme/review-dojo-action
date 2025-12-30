/**
 * Pull RequestのURL参照を表すValue Object
 */
export declare class PRReference {
    private readonly url;
    private static readonly GITHUB_PR_PATTERN;
    private constructor();
    static create(url: string): PRReference;
    getUrl(): string;
    /**
     * PR番号を抽出
     */
    getPRNumber(): number;
    /**
     * リポジトリオーナーを抽出
     */
    getOwner(): string;
    /**
     * リポジトリ名を抽出
     */
    getRepository(): string;
    equals(other: PRReference): boolean;
    toString(): string;
}
//# sourceMappingURL=PRReference.d.ts.map