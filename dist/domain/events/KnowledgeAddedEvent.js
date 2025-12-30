/**
 * 新規知見が追加されたイベント
 */
export class KnowledgeAddedEvent {
    title;
    severity;
    eventType = 'KnowledgeAdded';
    occurredOn;
    constructor(title, severity) {
        this.title = title;
        this.severity = severity;
        this.occurredOn = new Date();
    }
}
//# sourceMappingURL=KnowledgeAddedEvent.js.map