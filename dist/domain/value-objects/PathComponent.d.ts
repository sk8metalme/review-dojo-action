/**
 * パストラバーサル攻撃を防止する検証済みパスコンポーネント
 * scripts/apply-knowledge.js の sanitizePath() から移行
 */
export declare class PathComponent {
    private readonly value;
    private static readonly MAX_LENGTH;
    private constructor();
    static create(input: string): PathComponent;
    getValue(): string;
    equals(other: PathComponent): boolean;
    toString(): string;
}
//# sourceMappingURL=PathComponent.d.ts.map