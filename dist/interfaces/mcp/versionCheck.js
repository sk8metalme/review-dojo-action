import { Octokit } from '@octokit/rest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import semver from 'semver';
/**
 * review-dojoの更新チェック
 * @param installDir review-dojoがインストールされているディレクトリ（省略時は自動検出）
 * @returns 更新情報、またはエラー時はnull
 */
export async function checkForUpdates(installDir) {
    try {
        const octokit = new Octokit();
        // 最新リリースを取得
        const { data: release } = await octokit.repos.getLatestRelease({
            owner: 'sk8metalme',
            repo: 'review-dojo',
        });
        // インストールディレクトリの自動検出
        if (!installDir) {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            // dist/interfaces/mcp から../../.. でルートへ
            installDir = join(__dirname, '../../..');
        }
        // ローカルバージョンを取得
        let currentVersion;
        try {
            const packageJsonPath = join(installDir, 'package.json');
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            currentVersion = packageJson.version;
            if (!currentVersion || typeof currentVersion !== 'string') {
                console.error('[review-dojo] Version check failed: Invalid version in package.json');
                return null;
            }
        }
        catch (fileError) {
            console.error('[review-dojo] Version check failed: Could not read package.json', fileError instanceof Error ? fileError.message : String(fileError));
            return null;
        }
        // タグ名から "v" プレフィックスを除去
        const latestVersion = release.tag_name.replace(/^v/, '');
        // semverでバージョン比較（型安全性を確保）
        const comparisonResult = semver.gt(latestVersion, currentVersion);
        if (comparisonResult === null) {
            console.error(`[review-dojo] Version check failed: Invalid version format (current: ${currentVersion}, latest: ${latestVersion})`);
            return null;
        }
        return {
            currentVersion,
            latestVersion,
            updateAvailable: comparisonResult,
            updateCommand: `cd "${installDir}" && git pull && npm install && npm run build`,
        };
    }
    catch (error) {
        // ネットワークエラー、API制限などは無視（オフライン動作を妨げない）
        if (error && typeof error === 'object' && 'status' in error) {
            console.error(`[review-dojo] Version check failed (HTTP ${error.status})`);
        }
        else {
            console.error('[review-dojo] Version check failed:', error instanceof Error ? error.message : String(error));
        }
        return null;
    }
}
//# sourceMappingURL=versionCheck.js.map