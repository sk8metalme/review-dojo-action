import { KnowledgeItem } from '../../domain/entities/KnowledgeItem.js';
import { Category } from '../../domain/value-objects/Category.js';
import { Language } from '../../domain/value-objects/Language.js';
/**
 * Markdown Serializer Port (インターフェース)
 * Infrastructure層で実装される
 */
export interface IMarkdownSerializer {
    /**
     * 知見アイテムをMarkdown形式にシリアライズ
     */
    serialize(category: Category, language: Language, items: readonly KnowledgeItem[]): string;
    /**
     * Markdownテキストから知見アイテムをデシリアライズ
     */
    deserialize(markdown: string): KnowledgeItem[];
    /**
     * 個別アイテムをMarkdownに変換
     * アーカイブなどで個別のアイテムをMarkdown化する際に使用
     */
    itemToMarkdown(item: KnowledgeItem): string;
}
//# sourceMappingURL=IMarkdownSerializer.d.ts.map