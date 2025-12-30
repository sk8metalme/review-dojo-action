import { DomainEvent } from './DomainEvent.js';
/**
 * 新規知見が追加されたイベント
 */
export declare class KnowledgeAddedEvent implements DomainEvent {
    readonly title: string;
    readonly severity: string;
    readonly eventType = "KnowledgeAdded";
    readonly occurredOn: Date;
    constructor(title: string, severity: string);
}
//# sourceMappingURL=KnowledgeAddedEvent.d.ts.map