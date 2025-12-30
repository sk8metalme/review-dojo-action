import { IKnowledgeMatcher } from '../../domain/services/matchers/IKnowledgeMatcher.js';
import { IKnowledgeRepository } from '../ports/IKnowledgeRepository.js';
/**
 * 知見適用ユースケース
 * scripts/apply-knowledge.js の updateKnowledgeFile() から移行
 */
export declare class ApplyKnowledgeUseCase {
    private readonly repository;
    private readonly matcher;
    constructor(repository: IKnowledgeRepository, matcher: IKnowledgeMatcher);
    /**
     * 知見を適用
     */
    execute(input: {
        category: string;
        language: string;
        knowledge_items: Array<{
            title: string;
            severity?: string;
            summary: string;
            recommendation: string;
            code_example?: {
                bad?: string;
                good?: string;
            };
            file_path?: string;
            pr_url?: string;
        }>;
    }): Promise<number>;
}
//# sourceMappingURL=ApplyKnowledgeUseCase.d.ts.map