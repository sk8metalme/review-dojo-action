import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
import { KnowledgeSearchService } from '../../domain/services/KnowledgeSearchService.js';
/**
 * カテゴリ情報DTO
 */
export interface CategoryDTO {
    name: string;
    description: string;
    knowledgeCount: number;
}
/**
 * 言語情報DTO
 */
export interface LanguageDTO {
    name: string;
    knowledgeCount: number;
}
/**
 * 知見メタデータ一覧取得Use Case
 */
export declare class ListKnowledgeMetadataUseCase {
    private readonly repository;
    private readonly searchService;
    constructor(repository: IKnowledgeRepository, searchService: KnowledgeSearchService);
    /**
     * カテゴリ一覧を取得
     */
    listCategories(): Promise<CategoryDTO[]>;
    /**
     * 言語一覧を取得
     */
    listLanguages(): Promise<LanguageDTO[]>;
    /**
     * カテゴリの説明を取得
     */
    private getCategoryDescription;
}
//# sourceMappingURL=ListKnowledgeMetadataUseCase.d.ts.map