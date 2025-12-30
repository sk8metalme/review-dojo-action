import { KnowledgeItem } from '../../domain/entities/KnowledgeItem.js';
import { Category } from '../../domain/value-objects/Category.js';
import { Language } from '../../domain/value-objects/Language.js';
import { IKnowledgeRepository } from '../../application/ports/IKnowledgeRepository.js';
import { IMarkdownSerializer } from '../../application/ports/IMarkdownSerializer.js';
/**
 * GitHub API ベースの Knowledge Repository 実装（読み取り専用）
 * MCPサーバーのリモートモードで使用
 */
export declare class GitHubKnowledgeRepository implements IKnowledgeRepository {
    private readonly serializer;
    private octokit;
    private owner;
    private repo;
    private cache;
    private findAllCache;
    private readonly CACHE_TTL;
    constructor(repoPath: string, serializer: IMarkdownSerializer, token?: string);
    /**
     * カテゴリ・言語から既存の知見を読み込む
     */
    findByPath(category: Category, language: Language): Promise<readonly KnowledgeItem[]>;
    /**
     * 知見をファイルに保存（リモートモードでは非対応）
     */
    save(_category: Category, _language: Language, _items: readonly KnowledgeItem[]): Promise<void>;
    /**
     * ファイルが存在するか確認
     */
    exists(category: Category, language: Language): Promise<boolean>;
    /**
     * アーカイブファイルに保存（リモートモードでは非対応）
     */
    archive(_category: Category, _language: Language, _items: readonly KnowledgeItem[]): Promise<void>;
    /**
     * すべての知見を読み込む（MCP検索用）
     */
    findAll(): Promise<Map<string, Map<string, KnowledgeItem[]>>>;
}
//# sourceMappingURL=GitHubKnowledgeRepository.d.ts.map