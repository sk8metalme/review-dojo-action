/**
 * 知見の重要度を表すValue Object
 */
export class Severity {
    value;
    static VALID_VALUES = ['critical', 'warning', 'info'];
    constructor(value) {
        this.value = value;
    }
    static critical() {
        return new Severity('critical');
    }
    static warning() {
        return new Severity('warning');
    }
    static info() {
        return new Severity('info');
    }
    static fromString(value) {
        const normalized = value.toLowerCase();
        if (!Severity.VALID_VALUES.includes(normalized)) {
            throw new Error(`Invalid severity: ${value}. Must be one of: ${Severity.VALID_VALUES.join(', ')}`);
        }
        return new Severity(normalized);
    }
    getValue() {
        return this.value;
    }
    isCritical() {
        return this.value === 'critical';
    }
    isWarning() {
        return this.value === 'warning';
    }
    isInfo() {
        return this.value === 'info';
    }
    equals(other) {
        return this.value === other.value;
    }
    toString() {
        return this.value;
    }
}
//# sourceMappingURL=Severity.js.map