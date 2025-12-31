/**
 * 知見の重要度を表すValue Object
 */
export class Severity {
  private static readonly VALID_VALUES = ['critical', 'warning', 'info'] as const;

  private constructor(private readonly value: typeof Severity.VALID_VALUES[number]) {}

  static critical(): Severity {
    return new Severity('critical');
  }

  static warning(): Severity {
    return new Severity('warning');
  }

  static info(): Severity {
    return new Severity('info');
  }

  static fromString(value: string): Severity {
    const normalized = value.toLowerCase();
    if (!Severity.VALID_VALUES.includes(normalized as any)) {
      throw new Error(`Invalid severity: ${value}. Must be one of: ${Severity.VALID_VALUES.join(', ')}`);
    }
    return new Severity(normalized as typeof Severity.VALID_VALUES[number]);
  }

  getValue(): string {
    return this.value;
  }

  isCritical(): boolean {
    return this.value === 'critical';
  }

  isWarning(): boolean {
    return this.value === 'warning';
  }

  isInfo(): boolean {
    return this.value === 'info';
  }

  equals(other: Severity): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
