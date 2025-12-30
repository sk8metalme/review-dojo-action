/**
 * プログラミング言語を表すValue Object
 */
export declare class Language {
    private readonly value;
    private static readonly KNOWN_LANGUAGES;
    private constructor();
    static fromString(value: string): Language;
    getValue(): string;
    isKnownLanguage(): boolean;
    equals(other: Language): boolean;
    toString(): string;
    /**
     * ファイル拡張子から言語を推定
     */
    static fromExtension(extension: string): Language;
}
//# sourceMappingURL=Language.d.ts.map