import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
import { KnowledgeSearchService } from '../../domain/services/KnowledgeSearchService.js';
/**
 * チェックリストアイテムDTO
 */
export interface ChecklistItemDTO {
    category: string;
    severity: string;
    title: string;
    checkItem: string;
    knowledgeId: string;
}
/**
 * チェックリスト生成レスポンス
 */
export interface GeneratePRChecklistResponse {
    checklist: ChecklistItemDTO[];
    summary: string;
}
/**
 * PRチェックリスト生成Use Case
 */
export declare class GeneratePRChecklistUseCase {
    private readonly repository;
    private readonly searchService;
    constructor(repository: IKnowledgeRepository, searchService: KnowledgeSearchService);
    execute(params: {
        filePaths: string[];
        languages?: string[];
        severityFilter?: string;
    }): Promise<GeneratePRChecklistResponse>;
    /**
     * ファイルパスから言語を推定
     */
    private detectLanguages;
    /**
     * タイトルをチェック項目形式に変換
     * 例: "SQLインジェクション対策" → "SQLインジェクション対策を実施しましたか？"
     */
    private convertToCheckItem;
    /**
     * サマリー生成
     */
    private generateSummary;
}
//# sourceMappingURL=GeneratePRChecklistUseCase.d.ts.map