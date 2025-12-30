export interface VersionCheckResult {
    currentVersion: string;
    latestVersion: string;
    updateAvailable: boolean;
    updateCommand: string;
}
/**
 * review-dojoの更新チェック
 * @param installDir review-dojoがインストールされているディレクトリ（省略時は自動検出）
 * @returns 更新情報、またはエラー時はnull
 */
export declare function checkForUpdates(installDir?: string): Promise<VersionCheckResult | null>;
//# sourceMappingURL=versionCheck.d.ts.map