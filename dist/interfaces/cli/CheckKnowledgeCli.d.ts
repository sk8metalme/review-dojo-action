/**
 * CLI オプション
 */
export interface CheckKnowledgeOptions {
    /** チェック対象のファイルパス一覧 */
    filePaths: string[];
    /** 出力フォーマット (markdown または json) */
    outputFormat: 'markdown' | 'json';
    /** 重要度フィルタ (カンマ区切り: critical,warning,info) */
    severityFilter?: string;
    /** 空の結果も含めるかどうか */
    includeEmpty: boolean;
    /** 知識ベースのディレクトリパス */
    knowledgeDir: string;
}
/**
 * CLI Entry Point for CI/CD Knowledge Check
 */
export declare class CheckKnowledgeCli {
    run(args: string[]): Promise<void>;
    /**
     * コマンドライン引数をパース
     */
    private parseArgs;
    /**
     * 結果をフォーマットして出力
     */
    private formatOutput;
    /**
     * ヘルプを表示
     */
    private showHelp;
}
//# sourceMappingURL=CheckKnowledgeCli.d.ts.map