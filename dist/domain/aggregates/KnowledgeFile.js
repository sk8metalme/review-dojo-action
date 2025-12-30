import { KnowledgeItem } from '../entities/KnowledgeItem.js';
import { KnowledgeAddedEvent } from '../events/KnowledgeAddedEvent.js';
import { KnowledgeMergedEvent } from '../events/KnowledgeMergedEvent.js';
import { KnowledgeArchivedEvent } from '../events/KnowledgeArchivedEvent.js';
/**
 * KnowledgeFile Aggregate Root
 *
 * カテゴリ・言語ごとの知見ファイルを管理
 * 不変条件: 最大100件まで保持（超過時は自動アーカイブ）
 */
export class KnowledgeFile {
    category;
    language;
    items;
    matcher;
    static MAX_ITEMS = 100;
    events = [];
    constructor(category, language, items, matcher) {
        this.category = category;
        this.language = language;
        this.items = items;
        this.matcher = matcher;
    }
    /**
     * ファクトリーメソッド: KnowledgeFileを作成
     */
    static create(category, language, existingItems, matcher) {
        return new KnowledgeFile(category, language, [...existingItems], matcher);
    }
    /**
     * 知見を追加（マージ or 新規追加）
     */
    addKnowledge(input) {
        const similar = this.matcher.findSimilar(input, this.items);
        if (similar) {
            // 既存知見とマージ
            similar.merge({ pr_url: input.pr_url });
            this.events.push(new KnowledgeMergedEvent(similar.getTitle(), similar.getOccurrences()));
        }
        else {
            // 新規知見を追加
            const newItem = KnowledgeItem.create(input);
            this.items.push(newItem);
            this.events.push(new KnowledgeAddedEvent(newItem.getTitle(), newItem.getSeverity().getValue()));
        }
        this.enforceLimit();
    }
    /**
     * 不変条件: 100件制限を適用
     * 超過分は発生回数の少ないものからアーカイブ
     */
    enforceLimit() {
        if (this.items.length <= KnowledgeFile.MAX_ITEMS)
            return;
        // 発生回数でソート（降順）
        this.items.sort((a, b) => b.getOccurrences() - a.getOccurrences());
        // 超過分をアーカイブ対象として取得
        const archivedItems = this.items.slice(KnowledgeFile.MAX_ITEMS);
        const archivedCount = archivedItems.length;
        // アイテムを削除
        this.items.splice(KnowledgeFile.MAX_ITEMS);
        // アーカイブイベントを発行
        this.events.push(new KnowledgeArchivedEvent(archivedItems, archivedCount, this.category.getValue(), this.language.getValue()));
    }
    /**
     * 未コミットのドメインイベントを取得
     */
    getUncommittedEvents() {
        return [...this.events];
    }
    /**
     * イベントをクリア（永続化後に呼ぶ）
     */
    clearEvents() {
        this.events.length = 0;
    }
    /**
     * 保持している知見アイテムを取得
     */
    getItems() {
        return [...this.items];
    }
    /**
     * カテゴリを取得
     */
    getCategory() {
        return this.category;
    }
    /**
     * 言語を取得
     */
    getLanguage() {
        return this.language;
    }
    /**
     * ファイルパスを取得（category/language.md）
     */
    getFilePath() {
        return `${this.category.getValue()}/${this.language.getValue()}.md`;
    }
    /**
     * 知見の数を取得
     */
    getItemCount() {
        return this.items.length;
    }
}
//# sourceMappingURL=KnowledgeFile.js.map