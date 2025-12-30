/**
 * コード例（悪い例と良い例）を表すValue Object
 */
export class CodeExample {
    bad;
    good;
    constructor(bad, good) {
        this.bad = bad;
        this.good = good;
    }
    static create(bad = '', good = '') {
        return new CodeExample(bad, good);
    }
    static empty() {
        return new CodeExample('', '');
    }
    getBad() {
        return this.bad;
    }
    getGood() {
        return this.good;
    }
    isEmpty() {
        return !this.bad && !this.good;
    }
    hasBad() {
        return Boolean(this.bad);
    }
    hasGood() {
        return Boolean(this.good);
    }
    equals(other) {
        return this.bad === other.bad && this.good === other.good;
    }
    toString() {
        if (this.isEmpty())
            return '(no code example)';
        const parts = [];
        if (this.bad)
            parts.push(`Bad: ${this.bad.substring(0, 50)}...`);
        if (this.good)
            parts.push(`Good: ${this.good.substring(0, 50)}...`);
        return parts.join(' | ');
    }
}
//# sourceMappingURL=CodeExample.js.map