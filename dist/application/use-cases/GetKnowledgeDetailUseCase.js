/**
 * 知見詳細取得Use Case
 */
export class GetKnowledgeDetailUseCase {
    repository;
    searchService;
    constructor(repository, searchService) {
        this.repository = repository;
        this.searchService = searchService;
    }
    async execute(id) {
        // すべての知見を取得
        const allKnowledge = await this.repository.findAll();
        // IDから検索
        const result = this.searchService.findById(allKnowledge, id);
        if (!result) {
            return null;
        }
        const item = result.item;
        const codeExample = item.getCodeExample();
        return {
            category: result.category,
            language: result.language,
            severity: item.getSeverity().getValue(),
            title: item.getTitle(),
            summary: item.getSummary(),
            recommendation: item.getRecommendation(),
            occurrences: item.getOccurrences(),
            codeExample: codeExample.isEmpty()
                ? undefined
                : {
                    bad: codeExample.getBad(),
                    good: codeExample.getGood()
                },
            filePathExample: item.getTargetFile(),
            prReferences: item.getReferences().map(ref => ref.getUrl())
        };
    }
}
//# sourceMappingURL=GetKnowledgeDetailUseCase.js.map