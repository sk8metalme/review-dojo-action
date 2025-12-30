/**
 * 機密情報マスクサービス
 * scripts/apply-knowledge.js の maskSensitiveInfo() と SENSITIVE_PATTERNS から移行
 */
export declare class SensitiveInfoMasker {
    /**
     * 機密情報マスク用の正規表現パターン
     * 注意: より具体的なパターンを先に配置（優先順位）
     */
    private static readonly SENSITIVE_PATTERNS;
    /**
     * テキスト内の機密情報をマスクする
     */
    mask(text: string): string;
    /**
     * 複数のテキストをまとめてマスク
     */
    maskMultiple(...texts: string[]): string[];
}
//# sourceMappingURL=SensitiveInfoMasker.d.ts.map