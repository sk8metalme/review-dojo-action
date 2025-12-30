import { KnowledgeItem } from '../../domain/entities/KnowledgeItem.js';
import { Category } from '../../domain/value-objects/Category.js';
import { Language } from '../../domain/value-objects/Language.js';
import { IMarkdownSerializer } from '../../application/ports/IMarkdownSerializer.js';
/**
 * Markdown Serializer実装
 * scripts/apply-knowledge.js の knowledgeToMarkdown() と parseKnowledgeFile() から移行
 */
export declare class MarkdownSerializer implements IMarkdownSerializer {
    /**
     * 知見アイテムをMarkdown形式にシリアライズ
     */
    serialize(category: Category, language: Language, items: readonly KnowledgeItem[]): string;
    /**
     * 個別アイテムをMarkdownに変換（公開メソッド）
     */
    itemToMarkdown(item: KnowledgeItem): string;
    /**
     * Markdownテキストから知見アイテムをデシリアライズ
     */
    deserialize(markdown: string): KnowledgeItem[];
    /**
     * セクションをパースしてKnowledgeItemを作成
     */
    private parseSection;
    /**
     * 文字列の先頭を大文字に
     */
    private capitalize;
}
//# sourceMappingURL=MarkdownSerializer.d.ts.map