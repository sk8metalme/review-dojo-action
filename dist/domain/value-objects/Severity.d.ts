/**
 * 知見の重要度を表すValue Object
 */
export declare class Severity {
    private readonly value;
    private static readonly VALID_VALUES;
    private constructor();
    static critical(): Severity;
    static warning(): Severity;
    static info(): Severity;
    static fromString(value: string): Severity;
    getValue(): string;
    isCritical(): boolean;
    isWarning(): boolean;
    isInfo(): boolean;
    equals(other: Severity): boolean;
    toString(): string;
}
//# sourceMappingURL=Severity.d.ts.map