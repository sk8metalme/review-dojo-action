import { IKnowledgeMatcher, KnowledgeInput, HasTitle } from './IKnowledgeMatcher.js';
/**
 * タイトル完全一致による類似判定実装
 * scripts/apply-knowledge.js の findSimilarKnowledge() から移行
 */
export declare class ExactTitleMatcher implements IKnowledgeMatcher {
    findSimilar<T extends HasTitle>(newItem: KnowledgeInput, existing: T[]): T | null;
}
//# sourceMappingURL=ExactTitleMatcher.d.ts.map