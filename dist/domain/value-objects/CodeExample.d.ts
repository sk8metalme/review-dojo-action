/**
 * コード例（悪い例と良い例）を表すValue Object
 */
export declare class CodeExample {
    private readonly bad;
    private readonly good;
    private constructor();
    static create(bad?: string, good?: string): CodeExample;
    static empty(): CodeExample;
    getBad(): string;
    getGood(): string;
    isEmpty(): boolean;
    hasBad(): boolean;
    hasGood(): boolean;
    equals(other: CodeExample): boolean;
    toString(): string;
}
//# sourceMappingURL=CodeExample.d.ts.map