/**
 * タイトル完全一致による類似判定実装
 * scripts/apply-knowledge.js の findSimilarKnowledge() から移行
 */
export class ExactTitleMatcher {
    findSimilar(newItem, existing) {
        const normalizedNewTitle = newItem.title.toLowerCase();
        const similar = existing.find(item => item.getTitle().toLowerCase() === normalizedNewTitle);
        return similar || null;
    }
}
//# sourceMappingURL=ExactTitleMatcher.js.map