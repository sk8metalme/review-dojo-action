/**
 * 知見のカテゴリを表すValue Object
 */
export class Category {
  private static readonly VALID_CATEGORIES = [
    'security',
    'performance',
    'readability',
    'design',
    'testing',
    'error-handling',
    'other'
  ] as const;

  private constructor(private readonly value: typeof Category.VALID_CATEGORIES[number]) {}

  static security(): Category {
    return new Category('security');
  }

  static performance(): Category {
    return new Category('performance');
  }

  static readability(): Category {
    return new Category('readability');
  }

  static design(): Category {
    return new Category('design');
  }

  static testing(): Category {
    return new Category('testing');
  }

  static errorHandling(): Category {
    return new Category('error-handling');
  }

  static other(): Category {
    return new Category('other');
  }

  static fromString(value: string): Category {
    const normalized = value.toLowerCase();
    if (!Category.VALID_CATEGORIES.includes(normalized as any)) {
      throw new Error(
        `Invalid category: ${value}. Must be one of: ${Category.VALID_CATEGORIES.join(', ')}`
      );
    }
    return new Category(normalized as typeof Category.VALID_CATEGORIES[number]);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Category): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
