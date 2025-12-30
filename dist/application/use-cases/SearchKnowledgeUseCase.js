import { KnowledgeQuery } from '../../domain/value-objects/KnowledgeQuery.js';
/**
 * 知見検索Use Case
 */
export class SearchKnowledgeUseCase {
    repository;
    searchService;
    constructor(repository, searchService) {
        this.repository = repository;
        this.searchService = searchService;
    }
    async execute(params) {
        // クエリオブジェクト作成
        const query = KnowledgeQuery.create(params);
        // すべての知見を取得
        const allKnowledge = await this.repository.findAll();
        // 検索実行
        const searchResults = this.searchService.search(allKnowledge, query);
        // DTOに変換
        const results = searchResults.map(result => {
            const id = this.searchService.generateId(result.category, result.language, result.item);
            const references = result.item.getReferences();
            const prReferences = references
                .slice(0, 3) // 最初の3件のみ
                .map(ref => ref.getUrl());
            return {
                id,
                category: result.category,
                language: result.language,
                severity: result.item.getSeverity().getValue(),
                title: result.item.getTitle(),
                summary: result.item.getSummary(),
                occurrences: result.item.getOccurrences(),
                filePathExample: result.item.getTargetFile(),
                prReferences
            };
        });
        return {
            totalCount: results.length,
            results
        };
    }
}
//# sourceMappingURL=SearchKnowledgeUseCase.js.map