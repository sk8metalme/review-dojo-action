import { KnowledgeQuery } from '../value-objects/KnowledgeQuery.js';
import { KnowledgeItem } from '../entities/KnowledgeItem.js';
/**
 * 検索結果アイテム
 * カテゴリと言語の情報を含む
 */
export interface SearchResultItem {
    category: string;
    language: string;
    item: KnowledgeItem;
}
/**
 * 知見検索サービス
 * Domain層の検索ロジックを担当
 */
export declare class KnowledgeSearchService {
    /**
     * 知見を検索してフィルタリング
     */
    search(allKnowledge: Map<string, Map<string, KnowledgeItem[]>>, query: KnowledgeQuery): SearchResultItem[];
    /**
     * カテゴリ一覧を取得（知見数を含む）
     */
    listCategories(allKnowledge: Map<string, Map<string, KnowledgeItem[]>>): Array<{
        name: string;
        knowledgeCount: number;
    }>;
    /**
     * 言語一覧を取得（知見数を含む）
     */
    listLanguages(allKnowledge: Map<string, Map<string, KnowledgeItem[]>>): Array<{
        name: string;
        knowledgeCount: number;
    }>;
    /**
     * IDから知見を検索
     * ID形式: `{category}/{language}/{titleHash}`
     */
    findById(allKnowledge: Map<string, Map<string, KnowledgeItem[]>>, id: string): SearchResultItem | null;
    /**
     * 知見のIDを生成
     * ID形式: `{category}/{language}/{titleHash}`
     */
    generateId(category: string, language: string, item: KnowledgeItem): string;
    /**
     * タイトルからハッシュを生成（簡易実装）
     * 本番環境ではより堅牢なハッシュ関数を使用すべき
     */
    private hashTitle;
}
//# sourceMappingURL=KnowledgeSearchService.d.ts.map