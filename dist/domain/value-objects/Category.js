/**
 * 知見のカテゴリを表すValue Object
 */
export class Category {
    value;
    static VALID_CATEGORIES = [
        'security',
        'performance',
        'readability',
        'design',
        'testing',
        'error-handling',
        'other'
    ];
    constructor(value) {
        this.value = value;
    }
    static security() {
        return new Category('security');
    }
    static performance() {
        return new Category('performance');
    }
    static readability() {
        return new Category('readability');
    }
    static design() {
        return new Category('design');
    }
    static testing() {
        return new Category('testing');
    }
    static errorHandling() {
        return new Category('error-handling');
    }
    static other() {
        return new Category('other');
    }
    static fromString(value) {
        const normalized = value.toLowerCase();
        if (!Category.VALID_CATEGORIES.includes(normalized)) {
            throw new Error(`Invalid category: ${value}. Must be one of: ${Category.VALID_CATEGORIES.join(', ')}`);
        }
        return new Category(normalized);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
//# sourceMappingURL=Category.js.map