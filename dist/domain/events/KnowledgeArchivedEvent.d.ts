import { DomainEvent } from './DomainEvent.js';
import { KnowledgeItem } from '../entities/KnowledgeItem.js';
/**
 * 知見がアーカイブされたイベント
 * 100件超過時に発火
 */
export declare class KnowledgeArchivedEvent implements DomainEvent {
    readonly archivedItems: readonly KnowledgeItem[];
    readonly archivedCount: number;
    readonly category: string;
    readonly language: string;
    readonly eventType = "KnowledgeArchived";
    readonly occurredOn: Date;
    constructor(archivedItems: readonly KnowledgeItem[], archivedCount: number, category: string, language: string);
}
//# sourceMappingURL=KnowledgeArchivedEvent.d.ts.map