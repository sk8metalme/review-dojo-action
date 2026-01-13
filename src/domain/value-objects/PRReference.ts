/**
 * Pull RequestのURL参照を表すValue Object
 */
export class PRReference {
  private constructor(private readonly url: string) {}

  /**
   * GitHub ホストを環境変数から取得
   * 優先順位: GH_HOST → GITHUB_HOST → デフォルト (github.com)
   */
  private static getGitHubHost(): string {
    return process.env.GH_HOST || process.env.GITHUB_HOST || 'github.com';
  }

  /**
   * GitHub PR URL のバリデーションパターンを動的生成
   */
  private static buildPRPattern(): RegExp {
    const host = PRReference.getGitHubHost().replace(/\./g, '\\.');
    return new RegExp(`^https:\\/\\/${host}\\/[^/]+\\/[^/]+\\/pull\\/\\d+$`);
  }

  static create(url: string): PRReference {
    if (!url || typeof url !== 'string') {
      throw new Error('PR reference URL must be a non-empty string');
    }

    // GitHub PR URLの形式をチェック
    const pattern = PRReference.buildPRPattern();
    if (!pattern.test(url)) {
      const host = PRReference.getGitHubHost();
      throw new Error(
        `Invalid PR reference URL: ${url}. Must be a GitHub PR URL (e.g., https://${host}/owner/repo/pull/123)`
      );
    }

    return new PRReference(url);
  }

  getUrl(): string {
    return this.url;
  }

  /**
   * PR番号を抽出
   */
  getPRNumber(): number {
    const match = this.url.match(/\/pull\/(\d+)$/);
    if (!match) {
      throw new Error(`Failed to extract PR number from URL: ${this.url}`);
    }
    return parseInt(match[1], 10);
  }

  /**
   * リポジトリオーナーを抽出
   */
  getOwner(): string {
    const host = PRReference.getGitHubHost().replace(/\./g, '\\.');
    const match = this.url.match(new RegExp(`${host}\\/([^/]+)\\/`));
    if (!match) {
      throw new Error(`Failed to extract owner from URL: ${this.url}`);
    }
    return match[1];
  }

  /**
   * リポジトリ名を抽出
   */
  getRepository(): string {
    const host = PRReference.getGitHubHost().replace(/\./g, '\\.');
    const match = this.url.match(new RegExp(`${host}\\/[^/]+\\/([^/]+)\\/`));
    if (!match) {
      throw new Error(`Failed to extract repository from URL: ${this.url}`);
    }
    return match[1];
  }

  equals(other: PRReference): boolean {
    return this.url === other.url;
  }

  toString(): string {
    return this.url;
  }
}
