import { KnowledgeItem } from '../../domain/entities/KnowledgeItem.js';
import { Category } from '../../domain/value-objects/Category.js';
import { Language } from '../../domain/value-objects/Language.js';
import { IKnowledgeRepository } from '../../application/ports/IKnowledgeRepository.js';
import { IMarkdownSerializer } from '../../application/ports/IMarkdownSerializer.js';
/**
 * ファイルシステムベースのKnowledge Repository実装
 * scripts/apply-knowledge.js の parseKnowledgeFile() とファイルI/O部分から移行
 */
export declare class FileSystemKnowledgeRepository implements IKnowledgeRepository {
    private readonly baseDir;
    private readonly serializer;
    private static readonly ARCHIVE_SIZE_LIMIT;
    constructor(baseDir: string, serializer: IMarkdownSerializer);
    /**
     * カテゴリ・言語から既存の知見を読み込む
     */
    findByPath(category: Category, language: Language): Promise<readonly KnowledgeItem[]>;
    /**
     * 知見をファイルに保存
     */
    save(category: Category, language: Language, items: readonly KnowledgeItem[]): Promise<void>;
    /**
     * ファイルが存在するか確認
     */
    exists(category: Category, language: Language): Promise<boolean>;
    /**
     * アーカイブファイルに保存
     */
    archive(category: Category, language: Language, items: readonly KnowledgeItem[]): Promise<void>;
    /**
     * ファイルパスを取得
     */
    private getFilePath;
    /**
     * アーカイブパスを取得
     */
    private getArchivePath;
    /**
     * すべての知見を読み込む（MCP検索用）
     */
    findAll(): Promise<Map<string, Map<string, KnowledgeItem[]>>>;
    /**
     * 文字列の先頭を大文字に
     */
    private capitalize;
}
//# sourceMappingURL=FileSystemKnowledgeRepository.d.ts.map