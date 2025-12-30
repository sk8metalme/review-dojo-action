import { Category } from '../../domain/value-objects/Category.js';
import { Language } from '../../domain/value-objects/Language.js';
/**
 * 知見アーカイブイベントハンドラ
 * scripts/apply-knowledge.js の archiveOldKnowledge() から移行
 */
export class KnowledgeArchivedHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    /**
     * アーカイブイベントを処理
     */
    async handle(event) {
        const category = Category.fromString(event.category);
        const language = Language.fromString(event.language);
        console.log(`Archiving ${event.archivedCount} items for ${category.getValue()}/${language.getValue()}`);
        // アーカイブファイルに保存
        await this.repository.archive(category, language, event.archivedItems);
        console.log(`Archived ${event.archivedItems.length} items successfully`);
    }
}
//# sourceMappingURL=KnowledgeArchivedHandler.js.map