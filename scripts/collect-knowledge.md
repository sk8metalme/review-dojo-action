# PR Review Knowledge Extraction - 実行タスク

## あなたの役割
GitHub PR #${PR_NUMBER} (${PR_URL}) のレビューコメントから有益な知見を抽出し、`knowledge.json`ファイルを作成してください。

## 環境変数
- `PR_URL`: ${PR_URL}
- `REPO_OWNER`: ${REPO_OWNER}
- `REPO_NAME`: ${REPO_NAME}
- `PR_NUMBER`: ${PR_NUMBER}
- `GITHUB_TOKEN`: 認証用トークン

## 実行タスク

### ステップ1: PR情報の取得

以下のコマンドを実行して、**resolved（解決済み）のレビュースレッドのみ**を取得してください：

```bash
gh api graphql -f query='
  query($owner: String!, $repo: String!, $number: Int!) {
    repository(owner: $owner, name: $repo) {
      pullRequest(number: $number) {
        files(first: 100) {
          nodes {
            path
          }
        }
        reviewThreads(first: 100) {
          nodes {
            isResolved
            comments(first: 10) {
              nodes {
                body
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
' -f owner=$REPO_OWNER -f repo=$REPO_NAME -F number=$PR_NUMBER
```

### ステップ2: 知見の抽出

上記コマンドの結果から、以下の条件で知見を抽出してください：

**対象とするコメント（isResolved = true のみ）：**
- セキュリティリスクの指摘（SQLインジェクション、XSS等）
- パフォーマンス問題
- 設計・アーキテクチャの改善提案
- エラーハンドリングの不備
- テストの改善点
- ベストプラクティスからの逸脱

**除外するコメント：**
- タイポ・スペルミスのみ
- 「LGTM」等の承認コメント
- フォーマット・スタイルのみ
- 具体的な改善提案がないコメント

### ステップ3: 分類と重要度の判定

各知見を以下のカテゴリに分類：
- `security`, `performance`, `readability`, `design`, `testing`, `error-handling`, `other`

重要度を判定：
- `critical`: セキュリティリスクや重大なバグ
- `warning`: 品質低下やメンテナンス性に影響
- `info`: ベストプラクティスの提案

言語を識別：
- ファイル拡張子から判定（.java → java, .js/.ts → nodejs, .py → python 等）

### ステップ4: knowledge.jsonの作成

**重要：必ず`knowledge.json`ファイルを作成してください。**

以下のフォーマットでファイルを作成：

```bash
cat > knowledge.json << 'EOF'
{
  "knowledge_items": [
    {
      "category": "security",
      "language": "java",
      "severity": "critical",
      "title": "SQLインジェクション対策",
      "summary": "PreparedStatementを使用せず文字列結合でSQLを組み立てている",
      "recommendation": "必ずPreparedStatementを使用する",
      "code_example": {
        "bad": "String sql = \"SELECT * FROM users WHERE id = \" + userId;",
        "good": "PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM users WHERE id = ?\");\nps.setString(1, userId);"
      },
      "file_path": "src/main/java/com/example/UserDao.java",
      "pr_url": "${PR_URL}",
      "original_comment": "レビュアーの元のコメント"
    }
  ],
  "skipped_comments": [
    {
      "reason": "承認コメントのみ",
      "comment_preview": "LGTM!"
    }
  ]
}
EOF
```

## 重要な注意事項

1. **必ず`knowledge.json`ファイルを作成してください** - これは必須です
2. 解決済み（isResolved = true）のレビュースレッドのみを処理
3. APIキー、パスワード等の機密情報は除外
4. knowledge_items が空の場合でも、空の配列で`knowledge.json`を作成

## 実行確認

作成したファイルを確認：
```bash
ls -la knowledge.json
cat knowledge.json
```

これで知見抽出タスクは完了です。
