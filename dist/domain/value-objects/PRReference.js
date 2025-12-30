/**
 * Pull RequestのURL参照を表すValue Object
 */
export class PRReference {
    url;
    static GITHUB_PR_PATTERN = /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+$/;
    constructor(url) {
        this.url = url;
    }
    static create(url) {
        if (!url || typeof url !== 'string') {
            throw new Error('PR reference URL must be a non-empty string');
        }
        // GitHub PR URLの形式をチェック
        if (!PRReference.GITHUB_PR_PATTERN.test(url)) {
            throw new Error(`Invalid PR reference URL: ${url}. Must be a GitHub PR URL (e.g., https://github.com/owner/repo/pull/123)`);
        }
        return new PRReference(url);
    }
    getUrl() {
        return this.url;
    }
    /**
     * PR番号を抽出
     */
    getPRNumber() {
        const match = this.url.match(/\/pull\/(\d+)$/);
        if (!match) {
            throw new Error(`Failed to extract PR number from URL: ${this.url}`);
        }
        return parseInt(match[1], 10);
    }
    /**
     * リポジトリオーナーを抽出
     */
    getOwner() {
        const match = this.url.match(/github\.com\/([^/]+)\//);
        if (!match) {
            throw new Error(`Failed to extract owner from URL: ${this.url}`);
        }
        return match[1];
    }
    /**
     * リポジトリ名を抽出
     */
    getRepository() {
        const match = this.url.match(/github\.com\/[^/]+\/([^/]+)\//);
        if (!match) {
            throw new Error(`Failed to extract repository from URL: ${this.url}`);
        }
        return match[1];
    }
    equals(other) {
        return this.url === other.url;
    }
    toString() {
        return this.url;
    }
}
//# sourceMappingURL=PRReference.js.map