/**
 * パストラバーサル攻撃を防止する検証済みパスコンポーネント
 * scripts/apply-knowledge.js の sanitizePath() から移行
 */
export class PathComponent {
  private static readonly MAX_LENGTH = 100;

  private constructor(private readonly value: string) {}

  static create(input: string): PathComponent {
    if (!input || typeof input !== 'string') {
      throw new Error('Invalid path component: must be a non-empty string');
    }

    // 元の入力をチェック: 危険な文字が含まれている場合は即座に拒否
    if (input.includes('..') || input.includes('/') || input.includes('\\')) {
      throw new Error(`Invalid path component: ${input}`);
    }

    // ホワイトリスト検証: 英数字、ハイフン、アンダースコア、ドットのみ許可
    if (!/^[a-zA-Z0-9_.-]+$/.test(input)) {
      throw new Error(`Invalid path component: ${input}`);
    }

    // 長さ制限
    if (input.length > PathComponent.MAX_LENGTH) {
      throw new Error(`Path component too long: ${input}`);
    }

    // パスの先頭が`.`で始まる場合は拒否（隠しファイル/相対パス）
    if (input.startsWith('.')) {
      throw new Error(`Invalid path component: ${input}`);
    }

    return new PathComponent(input);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PathComponent): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
