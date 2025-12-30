import { KnowledgeArchivedEvent } from '../../domain/events/KnowledgeArchivedEvent.js';
import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
/**
 * 知見アーカイブイベントハンドラ
 * scripts/apply-knowledge.js の archiveOldKnowledge() から移行
 */
export declare class KnowledgeArchivedHandler {
    private readonly repository;
    constructor(repository: IKnowledgeRepository);
    /**
     * アーカイブイベントを処理
     */
    handle(event: KnowledgeArchivedEvent): Promise<void>;
}
//# sourceMappingURL=KnowledgeArchivedHandler.d.ts.map