/**
 * ドメイン固有のエラークラス
 */
export declare class DomainError extends Error {
    constructor(message: string);
}
export declare class InvalidSeverityError extends DomainError {
    constructor(value: string);
}
export declare class InvalidCategoryError extends DomainError {
    constructor(value: string);
}
export declare class InvalidLanguageError extends DomainError {
    constructor(value: string);
}
export declare class InvalidPathComponentError extends DomainError {
    constructor(value: string);
}
export declare class InvalidPRReferenceError extends DomainError {
    constructor(url: string);
}
export declare class KnowledgeLimitExceededError extends DomainError {
    constructor(limit: number, actual: number);
}
//# sourceMappingURL=DomainErrors.d.ts.map