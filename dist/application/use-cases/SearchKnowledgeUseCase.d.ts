import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
import { KnowledgeSearchService } from '../../domain/services/KnowledgeSearchService.js';
/**
 * 検索結果DTO
 */
export interface SearchResultDTO {
    id: string;
    category: string;
    language: string;
    severity: string;
    title: string;
    summary: string;
    occurrences: number;
    filePathExample: string;
    prReferences: string[];
}
/**
 * 検索結果レスポンス
 */
export interface SearchKnowledgeResponse {
    totalCount: number;
    results: SearchResultDTO[];
}
/**
 * 知見検索Use Case
 */
export declare class SearchKnowledgeUseCase {
    private readonly repository;
    private readonly searchService;
    constructor(repository: IKnowledgeRepository, searchService: KnowledgeSearchService);
    execute(params: {
        query?: string;
        category?: string;
        language?: string;
        severity?: string;
        filePath?: string;
        maxResults?: number;
    }): Promise<SearchKnowledgeResponse>;
}
//# sourceMappingURL=SearchKnowledgeUseCase.d.ts.map