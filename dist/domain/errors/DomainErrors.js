/**
 * ドメイン固有のエラークラス
 */
export class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class InvalidSeverityError extends DomainError {
    constructor(value) {
        super(`Invalid severity: ${value}`);
    }
}
export class InvalidCategoryError extends DomainError {
    constructor(value) {
        super(`Invalid category: ${value}`);
    }
}
export class InvalidLanguageError extends DomainError {
    constructor(value) {
        super(`Invalid language: ${value}`);
    }
}
export class InvalidPathComponentError extends DomainError {
    constructor(value) {
        super(`Invalid path component: ${value}`);
    }
}
export class InvalidPRReferenceError extends DomainError {
    constructor(url) {
        super(`Invalid PR reference URL: ${url}`);
    }
}
export class KnowledgeLimitExceededError extends DomainError {
    constructor(limit, actual) {
        super(`Knowledge item limit exceeded: ${actual} items (limit: ${limit})`);
    }
}
//# sourceMappingURL=DomainErrors.js.map