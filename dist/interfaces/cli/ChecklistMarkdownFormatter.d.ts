import { GeneratePRChecklistResponse } from '../../application/use-cases/GeneratePRChecklistUseCase.js';
/**
 * チェックリストをMarkdown形式に変換するフォーマッター
 */
export declare class ChecklistMarkdownFormatter {
    private static readonly COMMENT_MARKER;
    /**
     * チェックリストをMarkdown形式に変換
     */
    format(result: GeneratePRChecklistResponse): string;
    /**
     * 知見が見つからない場合のフォーマット
     */
    private formatEmpty;
    /**
     * 知見がある場合のフォーマット
     */
    private formatWithItems;
    /**
     * チェックリストアイテムのフォーマット
     */
    private formatItems;
    /**
     * 重要度でグループ化
     *
     * Note: Severity値は domain/value-objects/Severity.ts で
     * 'critical' | 'warning' | 'info' のいずれかに制限されているため、
     * これら3つ以外の値は存在しません。
     */
    private groupBySeverity;
    /**
     * フッター生成
     */
    private getFooter;
}
//# sourceMappingURL=ChecklistMarkdownFormatter.d.ts.map