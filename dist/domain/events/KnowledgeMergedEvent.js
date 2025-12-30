/**
 * 既存知見がマージされたイベント
 */
export class KnowledgeMergedEvent {
    title;
    newOccurrences;
    eventType = 'KnowledgeMerged';
    occurredOn;
    constructor(title, newOccurrences) {
        this.title = title;
        this.newOccurrences = newOccurrences;
        this.occurredOn = new Date();
    }
}
//# sourceMappingURL=KnowledgeMergedEvent.js.map