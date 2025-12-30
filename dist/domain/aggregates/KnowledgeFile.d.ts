import { KnowledgeItem } from '../entities/KnowledgeItem.js';
import { Category } from '../value-objects/Category.js';
import { Language } from '../value-objects/Language.js';
import { DomainEvent } from '../events/DomainEvent.js';
import { IKnowledgeMatcher, KnowledgeInput } from '../services/matchers/IKnowledgeMatcher.js';
/**
 * KnowledgeFile Aggregate Root
 *
 * カテゴリ・言語ごとの知見ファイルを管理
 * 不変条件: 最大100件まで保持（超過時は自動アーカイブ）
 */
export declare class KnowledgeFile {
    private readonly category;
    private readonly language;
    private items;
    private readonly matcher;
    private static readonly MAX_ITEMS;
    private readonly events;
    private constructor();
    /**
     * ファクトリーメソッド: KnowledgeFileを作成
     */
    static create(category: Category, language: Language, existingItems: KnowledgeItem[], matcher: IKnowledgeMatcher): KnowledgeFile;
    /**
     * 知見を追加（マージ or 新規追加）
     */
    addKnowledge(input: KnowledgeInput): void;
    /**
     * 不変条件: 100件制限を適用
     * 超過分は発生回数の少ないものからアーカイブ
     */
    private enforceLimit;
    /**
     * 未コミットのドメインイベントを取得
     */
    getUncommittedEvents(): readonly DomainEvent[];
    /**
     * イベントをクリア（永続化後に呼ぶ）
     */
    clearEvents(): void;
    /**
     * 保持している知見アイテムを取得
     */
    getItems(): readonly KnowledgeItem[];
    /**
     * カテゴリを取得
     */
    getCategory(): Category;
    /**
     * 言語を取得
     */
    getLanguage(): Language;
    /**
     * ファイルパスを取得（category/language.md）
     */
    getFilePath(): string;
    /**
     * 知見の数を取得
     */
    getItemCount(): number;
}
//# sourceMappingURL=KnowledgeFile.d.ts.map