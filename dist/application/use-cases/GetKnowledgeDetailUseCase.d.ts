import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
import { KnowledgeSearchService } from '../../domain/services/KnowledgeSearchService.js';
/**
 * 知見詳細DTO
 */
export interface KnowledgeDetailDTO {
    category: string;
    language: string;
    severity: string;
    title: string;
    summary: string;
    recommendation: string;
    occurrences: number;
    codeExample?: {
        bad: string;
        good: string;
    };
    filePathExample: string;
    prReferences: string[];
}
/**
 * 知見詳細取得Use Case
 */
export declare class GetKnowledgeDetailUseCase {
    private readonly repository;
    private readonly searchService;
    constructor(repository: IKnowledgeRepository, searchService: KnowledgeSearchService);
    execute(id: string): Promise<KnowledgeDetailDTO | null>;
}
//# sourceMappingURL=GetKnowledgeDetailUseCase.d.ts.map