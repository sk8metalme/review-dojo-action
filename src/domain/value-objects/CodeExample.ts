/**
 * コード例（悪い例と良い例）を表すValue Object
 */
export class CodeExample {
  private constructor(
    private readonly bad: string,
    private readonly good: string
  ) {}

  static create(bad: string = '', good: string = ''): CodeExample {
    return new CodeExample(bad, good);
  }

  static empty(): CodeExample {
    return new CodeExample('', '');
  }

  getBad(): string {
    return this.bad;
  }

  getGood(): string {
    return this.good;
  }

  isEmpty(): boolean {
    return !this.bad && !this.good;
  }

  hasBad(): boolean {
    return Boolean(this.bad);
  }

  hasGood(): boolean {
    return Boolean(this.good);
  }

  equals(other: CodeExample): boolean {
    return this.bad === other.bad && this.good === other.good;
  }

  toString(): string {
    if (this.isEmpty()) return '(no code example)';
    const parts: string[] = [];
    if (this.bad) parts.push(`Bad: ${this.bad.substring(0, 50)}...`);
    if (this.good) parts.push(`Good: ${this.good.substring(0, 50)}...`);
    return parts.join(' | ');
  }
}
