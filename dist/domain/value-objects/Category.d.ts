/**
 * 知見のカテゴリを表すValue Object
 */
export declare class Category {
    private readonly value;
    private static readonly VALID_CATEGORIES;
    private constructor();
    static security(): Category;
    static performance(): Category;
    static readability(): Category;
    static design(): Category;
    static testing(): Category;
    static errorHandling(): Category;
    static other(): Category;
    static fromString(value: string): Category;
    getValue(): string;
    equals(other: Category): boolean;
    toString(): string;
}
//# sourceMappingURL=Category.d.ts.map