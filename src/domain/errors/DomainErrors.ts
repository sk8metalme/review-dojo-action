/**
 * ドメイン固有のエラークラス
 */

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidSeverityError extends DomainError {
  constructor(value: string) {
    super(`Invalid severity: ${value}`);
  }
}

export class InvalidCategoryError extends DomainError {
  constructor(value: string) {
    super(`Invalid category: ${value}`);
  }
}

export class InvalidLanguageError extends DomainError {
  constructor(value: string) {
    super(`Invalid language: ${value}`);
  }
}

export class InvalidPathComponentError extends DomainError {
  constructor(value: string) {
    super(`Invalid path component: ${value}`);
  }
}

export class InvalidPRReferenceError extends DomainError {
  constructor(url: string) {
    super(`Invalid PR reference URL: ${url}`);
  }
}

export class KnowledgeLimitExceededError extends DomainError {
  constructor(limit: number, actual: number) {
    super(`Knowledge item limit exceeded: ${actual} items (limit: ${limit})`);
  }
}
