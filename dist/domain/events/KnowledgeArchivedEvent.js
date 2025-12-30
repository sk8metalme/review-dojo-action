/**
 * 知見がアーカイブされたイベント
 * 100件超過時に発火
 */
export class KnowledgeArchivedEvent {
    archivedItems;
    archivedCount;
    category;
    language;
    eventType = 'KnowledgeArchived';
    occurredOn;
    constructor(archivedItems, archivedCount, category, language) {
        this.archivedItems = archivedItems;
        this.archivedCount = archivedCount;
        this.category = category;
        this.language = language;
        this.occurredOn = new Date();
    }
}
//# sourceMappingURL=KnowledgeArchivedEvent.js.map