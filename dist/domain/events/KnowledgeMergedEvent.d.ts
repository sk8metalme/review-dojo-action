import { DomainEvent } from './DomainEvent.js';
/**
 * 既存知見がマージされたイベント
 */
export declare class KnowledgeMergedEvent implements DomainEvent {
    readonly title: string;
    readonly newOccurrences: number;
    readonly eventType = "KnowledgeMerged";
    readonly occurredOn: Date;
    constructor(title: string, newOccurrences: number);
}
//# sourceMappingURL=KnowledgeMergedEvent.d.ts.map