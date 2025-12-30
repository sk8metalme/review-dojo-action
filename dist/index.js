// src/index.ts
import { readFile as readFile2 } from "fs/promises";

// src/domain/value-objects/Severity.ts
var Severity = class _Severity {
  constructor(value) {
    this.value = value;
  }
  static VALID_VALUES = ["critical", "warning", "info"];
  static critical() {
    return new _Severity("critical");
  }
  static warning() {
    return new _Severity("warning");
  }
  static info() {
    return new _Severity("info");
  }
  static fromString(value) {
    const normalized = value.toLowerCase();
    if (!_Severity.VALID_VALUES.includes(normalized)) {
      throw new Error(`Invalid severity: ${value}. Must be one of: ${_Severity.VALID_VALUES.join(", ")}`);
    }
    return new _Severity(normalized);
  }
  getValue() {
    return this.value;
  }
  isCritical() {
    return this.value === "critical";
  }
  isWarning() {
    return this.value === "warning";
  }
  isInfo() {
    return this.value === "info";
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value;
  }
};

// src/domain/value-objects/CodeExample.ts
var CodeExample = class _CodeExample {
  constructor(bad, good) {
    this.bad = bad;
    this.good = good;
  }
  static create(bad = "", good = "") {
    return new _CodeExample(bad, good);
  }
  static empty() {
    return new _CodeExample("", "");
  }
  getBad() {
    return this.bad;
  }
  getGood() {
    return this.good;
  }
  isEmpty() {
    return !this.bad && !this.good;
  }
  hasBad() {
    return Boolean(this.bad);
  }
  hasGood() {
    return Boolean(this.good);
  }
  equals(other) {
    return this.bad === other.bad && this.good === other.good;
  }
  toString() {
    if (this.isEmpty())
      return "(no code example)";
    const parts = [];
    if (this.bad)
      parts.push(`Bad: ${this.bad.substring(0, 50)}...`);
    if (this.good)
      parts.push(`Good: ${this.good.substring(0, 50)}...`);
    return parts.join(" | ");
  }
};

// src/domain/value-objects/PRReference.ts
var PRReference = class _PRReference {
  constructor(url) {
    this.url = url;
  }
  static GITHUB_PR_PATTERN = /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+$/;
  static create(url) {
    if (!url || typeof url !== "string") {
      throw new Error("PR reference URL must be a non-empty string");
    }
    if (!_PRReference.GITHUB_PR_PATTERN.test(url)) {
      throw new Error(
        `Invalid PR reference URL: ${url}. Must be a GitHub PR URL (e.g., https://github.com/owner/repo/pull/123)`
      );
    }
    return new _PRReference(url);
  }
  getUrl() {
    return this.url;
  }
  /**
   * PR番号を抽出
   */
  getPRNumber() {
    const match = this.url.match(/\/pull\/(\d+)$/);
    if (!match) {
      throw new Error(`Failed to extract PR number from URL: ${this.url}`);
    }
    return parseInt(match[1], 10);
  }
  /**
   * リポジトリオーナーを抽出
   */
  getOwner() {
    const match = this.url.match(/github\.com\/([^/]+)\//);
    if (!match) {
      throw new Error(`Failed to extract owner from URL: ${this.url}`);
    }
    return match[1];
  }
  /**
   * リポジトリ名を抽出
   */
  getRepository() {
    const match = this.url.match(/github\.com\/[^/]+\/([^/]+)\//);
    if (!match) {
      throw new Error(`Failed to extract repository from URL: ${this.url}`);
    }
    return match[1];
  }
  equals(other) {
    return this.url === other.url;
  }
  toString() {
    return this.url;
  }
};

// src/domain/services/SensitiveInfoMasker.ts
var SensitiveInfoMasker = class _SensitiveInfoMasker {
  /**
   * 機密情報マスク用の正規表現パターン
   * 注意: より具体的なパターンを先に配置（優先順位）
   */
  static SENSITIVE_PATTERNS = [
    {
      name: "Private Key",
      pattern: /(-----BEGIN[A-Z ]+PRIVATE KEY-----[\s\S]+?-----END[A-Z ]+PRIVATE KEY-----)/g,
      replacement: "***PRIVATE_KEY***"
    },
    {
      name: "JWT Token",
      pattern: /(eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,})/g,
      replacement: "***JWT_TOKEN***"
    },
    {
      name: "GitHub Token",
      pattern: /(gh[pousr]_[a-zA-Z0-9]{36,})/g,
      replacement: "***GITHUB_TOKEN***"
    },
    {
      name: "AWS Key",
      pattern: /AKIA[0-9A-Z]{16}/g,
      replacement: "***AWS_KEY***"
    },
    {
      name: "Bearer Token",
      pattern: /Bearer\s+[a-zA-Z0-9._-]+/g,
      replacement: "Bearer ***TOKEN***"
    },
    {
      name: "Password",
      pattern: /password\s*[:=]\s*\S+/gi,
      replacement: "password: ***"
    },
    {
      name: "API Key",
      // Match common API key formats with prefixes to avoid false positives
      // Examples: api_key_xxx, apikey=xxx, API-KEY: xxx, API key: xxx
      pattern: /(api[_\s-]?key|secret[_\s-]?key|access[_\s-]?key)\s*[:=]\s*[a-zA-Z0-9_-]{16,}/gi,
      replacement: "$1: ***REDACTED***"
    }
  ];
  /**
   * テキスト内の機密情報をマスクする
   */
  mask(text) {
    if (!text)
      return text;
    let masked = text;
    for (const { pattern, replacement } of _SensitiveInfoMasker.SENSITIVE_PATTERNS) {
      masked = masked.replace(pattern, replacement);
    }
    return masked;
  }
  /**
   * 複数のテキストをまとめてマスク
   */
  maskMultiple(...texts) {
    return texts.map((text) => this.mask(text));
  }
};

// src/domain/entities/KnowledgeItem.ts
var KnowledgeItem = class _KnowledgeItem {
  constructor(title, severity, occurrences, summary, recommendation, codeExample, targetFile, references) {
    this.title = title;
    this.severity = severity;
    this.occurrences = occurrences;
    this.summary = summary;
    this.recommendation = recommendation;
    this.codeExample = codeExample;
    this.targetFile = targetFile;
    this.references = references;
  }
  /**
   * ファクトリーメソッド: 新規知見を作成
   */
  static create(params) {
    const masker = new SensitiveInfoMasker();
    const maskedSummary = masker.mask(params.summary);
    const maskedRecommendation = masker.mask(params.recommendation);
    const severity = params.severity ? Severity.fromString(params.severity) : Severity.info();
    const codeExample = params.code_example ? CodeExample.create(params.code_example.bad, params.code_example.good) : CodeExample.empty();
    const references = [];
    if (params.pr_url) {
      try {
        references.push(PRReference.create(params.pr_url));
      } catch (error) {
        console.warn(`Invalid PR URL: ${params.pr_url}`, error);
      }
    }
    return new _KnowledgeItem(
      params.title,
      severity,
      1,
      // 初回は1回発生
      maskedSummary,
      maskedRecommendation,
      codeExample,
      params.file_path || "",
      references
    );
  }
  /**
   * ファクトリーメソッド: Markdownからのデシリアライズ用
   * 発生回数と複数のPR参照を保持した状態で復元
   */
  static fromSerialized(params) {
    const masker = new SensitiveInfoMasker();
    const maskedSummary = masker.mask(params.summary);
    const maskedRecommendation = masker.mask(params.recommendation);
    const severity = params.severity ? Severity.fromString(params.severity) : Severity.info();
    const codeExample = params.code_example ? CodeExample.create(params.code_example.bad, params.code_example.good) : CodeExample.empty();
    const references = [];
    if (params.pr_urls) {
      for (const url of params.pr_urls) {
        try {
          references.push(PRReference.create(url));
        } catch (error) {
          console.warn(`Invalid PR URL during deserialization: ${url}`, error);
        }
      }
    }
    return new _KnowledgeItem(
      params.title,
      severity,
      params.occurrences,
      // デシリアライズ時は元の発生回数を保持
      maskedSummary,
      maskedRecommendation,
      codeExample,
      params.file_path || "",
      references
    );
  }
  /**
   * 既存知見とマージ（発生回数増加、PR参照追加）
   */
  merge(params) {
    this.occurrences++;
    if (params.pr_url) {
      try {
        const newRef = PRReference.create(params.pr_url);
        const alreadyExists = this.references.some(
          (ref) => ref.equals(newRef)
        );
        if (!alreadyExists) {
          this.references.push(newRef);
        }
      } catch (error) {
        console.warn(`Invalid PR URL during merge: ${params.pr_url}`, error);
      }
    }
  }
  // Getters
  getTitle() {
    return this.title;
  }
  getSeverity() {
    return this.severity;
  }
  getOccurrences() {
    return this.occurrences;
  }
  getSummary() {
    return this.summary;
  }
  getRecommendation() {
    return this.recommendation;
  }
  getCodeExample() {
    return this.codeExample;
  }
  getTargetFile() {
    return this.targetFile;
  }
  getReferences() {
    return [...this.references];
  }
  /**
   * Markdown出力用のプレーンオブジェクトに変換
   */
  toPlainObject() {
    return {
      title: this.title,
      severity: this.severity.getValue(),
      occurrences: this.occurrences,
      summary: this.summary,
      recommendation: this.recommendation,
      codeExample: {
        bad: this.codeExample.getBad(),
        good: this.codeExample.getGood()
      },
      targetFile: this.targetFile,
      references: this.references.map((ref) => ref.getUrl())
    };
  }
};

// src/domain/events/KnowledgeAddedEvent.ts
var KnowledgeAddedEvent = class {
  constructor(title, severity) {
    this.title = title;
    this.severity = severity;
    this.occurredOn = /* @__PURE__ */ new Date();
  }
  eventType = "KnowledgeAdded";
  occurredOn;
};

// src/domain/events/KnowledgeMergedEvent.ts
var KnowledgeMergedEvent = class {
  constructor(title, newOccurrences) {
    this.title = title;
    this.newOccurrences = newOccurrences;
    this.occurredOn = /* @__PURE__ */ new Date();
  }
  eventType = "KnowledgeMerged";
  occurredOn;
};

// src/domain/events/KnowledgeArchivedEvent.ts
var KnowledgeArchivedEvent = class {
  constructor(archivedItems, archivedCount, category, language) {
    this.archivedItems = archivedItems;
    this.archivedCount = archivedCount;
    this.category = category;
    this.language = language;
    this.occurredOn = /* @__PURE__ */ new Date();
  }
  eventType = "KnowledgeArchived";
  occurredOn;
};

// src/domain/aggregates/KnowledgeFile.ts
var KnowledgeFile = class _KnowledgeFile {
  constructor(category, language, items, matcher) {
    this.category = category;
    this.language = language;
    this.items = items;
    this.matcher = matcher;
  }
  static MAX_ITEMS = 100;
  events = [];
  /**
   * ファクトリーメソッド: KnowledgeFileを作成
   */
  static create(category, language, existingItems, matcher) {
    return new _KnowledgeFile(category, language, [...existingItems], matcher);
  }
  /**
   * 知見を追加（マージ or 新規追加）
   */
  addKnowledge(input) {
    const similar = this.matcher.findSimilar(input, this.items);
    if (similar) {
      similar.merge({ pr_url: input.pr_url });
      this.events.push(
        new KnowledgeMergedEvent(
          similar.getTitle(),
          similar.getOccurrences()
        )
      );
    } else {
      const newItem = KnowledgeItem.create(input);
      this.items.push(newItem);
      this.events.push(
        new KnowledgeAddedEvent(
          newItem.getTitle(),
          newItem.getSeverity().getValue()
        )
      );
    }
    this.enforceLimit();
  }
  /**
   * 不変条件: 100件制限を適用
   * 超過分は発生回数の少ないものからアーカイブ
   */
  enforceLimit() {
    if (this.items.length <= _KnowledgeFile.MAX_ITEMS)
      return;
    this.items.sort((a, b) => b.getOccurrences() - a.getOccurrences());
    const archivedItems = this.items.slice(_KnowledgeFile.MAX_ITEMS);
    const archivedCount = archivedItems.length;
    this.items.splice(_KnowledgeFile.MAX_ITEMS);
    this.events.push(
      new KnowledgeArchivedEvent(
        archivedItems,
        archivedCount,
        this.category.getValue(),
        this.language.getValue()
      )
    );
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
};

// src/domain/value-objects/Category.ts
var Category = class _Category {
  constructor(value) {
    this.value = value;
  }
  static VALID_CATEGORIES = [
    "security",
    "performance",
    "readability",
    "design",
    "testing",
    "error-handling",
    "other"
  ];
  static security() {
    return new _Category("security");
  }
  static performance() {
    return new _Category("performance");
  }
  static readability() {
    return new _Category("readability");
  }
  static design() {
    return new _Category("design");
  }
  static testing() {
    return new _Category("testing");
  }
  static errorHandling() {
    return new _Category("error-handling");
  }
  static other() {
    return new _Category("other");
  }
  static fromString(value) {
    const normalized = value.toLowerCase();
    if (!_Category.VALID_CATEGORIES.includes(normalized)) {
      throw new Error(
        `Invalid category: ${value}. Must be one of: ${_Category.VALID_CATEGORIES.join(", ")}`
      );
    }
    return new _Category(normalized);
  }
  getValue() {
    return this.value;
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value;
  }
};

// src/domain/value-objects/Language.ts
var Language = class _Language {
  constructor(value) {
    this.value = value;
  }
  static KNOWN_LANGUAGES = [
    "java",
    "javascript",
    "typescript",
    "python",
    "nodejs",
    "go",
    "rust",
    "php",
    "perl",
    "ruby",
    "csharp",
    "cpp",
    "kotlin",
    "swift",
    "other"
  ];
  static fromString(value) {
    if (!value || typeof value !== "string") {
      throw new Error("Language must be a non-empty string");
    }
    const normalized = value.toLowerCase();
    if (normalized.length > 50) {
      throw new Error(`Language name too long: ${normalized.length} characters (max: 50)`);
    }
    if (!/^[a-z0-9._-]+$/.test(normalized)) {
      throw new Error(`Invalid language name: ${value}. Only alphanumeric characters, dots, hyphens, and underscores are allowed`);
    }
    return new _Language(normalized);
  }
  getValue() {
    return this.value;
  }
  isKnownLanguage() {
    return _Language.KNOWN_LANGUAGES.includes(this.value);
  }
  equals(other) {
    return this.value === other.value;
  }
  toString() {
    return this.value;
  }
  /**
   * ファイル拡張子から言語を推定
   */
  static fromExtension(extension) {
    const ext = extension.toLowerCase().replace(/^\./, "");
    const extensionMap = {
      "java": "java",
      "js": "nodejs",
      "jsx": "nodejs",
      "ts": "typescript",
      "tsx": "typescript",
      "py": "python",
      "go": "go",
      "rs": "rust",
      "php": "php",
      "pl": "perl",
      "pm": "perl",
      "rb": "ruby",
      "cs": "csharp",
      "cpp": "cpp",
      "cc": "cpp",
      "cxx": "cpp",
      "kt": "kotlin",
      "kts": "kotlin",
      "swift": "swift"
    };
    const language = extensionMap[ext] || "other";
    return _Language.fromString(language);
  }
};

// src/application/use-cases/ApplyKnowledgeUseCase.ts
var ApplyKnowledgeUseCase = class {
  constructor(repository, matcher) {
    this.repository = repository;
    this.matcher = matcher;
  }
  /**
   * 知見を適用
   */
  async execute(input) {
    const category = Category.fromString(input.category);
    const language = Language.fromString(input.language);
    const existingItems = await this.repository.findByPath(category, language);
    const knowledgeFile = KnowledgeFile.create(
      category,
      language,
      [...existingItems],
      this.matcher
    );
    for (const item of input.knowledge_items) {
      knowledgeFile.addKnowledge(item);
    }
    knowledgeFile.getUncommittedEvents();
    await this.repository.save(category, language, knowledgeFile.getItems());
    knowledgeFile.clearEvents();
    return knowledgeFile.getItemCount();
  }
};

// src/infrastructure/FileSystemKnowledgeRepository.ts
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
var FileSystemKnowledgeRepository = class _FileSystemKnowledgeRepository {
  constructor(baseDir, serializer) {
    this.baseDir = baseDir;
    this.serializer = serializer;
  }
  static ARCHIVE_SIZE_LIMIT = 1e4;
  /**
   * カテゴリ・言語から既存の知見を読み込む
   */
  async findByPath(category, language) {
    const filePath = this.getFilePath(category, language);
    if (!existsSync(filePath)) {
      return [];
    }
    const content = await readFile(filePath, "utf-8");
    return this.serializer.deserialize(content);
  }
  /**
   * 知見をファイルに保存
   */
  async save(category, language, items) {
    const filePath = this.getFilePath(category, language);
    await mkdir(dirname(filePath), { recursive: true });
    const content = this.serializer.serialize(category, language, items);
    await writeFile(filePath, content, "utf-8");
  }
  /**
   * ファイルが存在するか確認
   */
  async exists(category, language) {
    const filePath = this.getFilePath(category, language);
    return existsSync(filePath);
  }
  /**
   * アーカイブファイルに保存
   */
  async archive(category, language, items) {
    const archivePath = this.getArchivePath(category, language);
    await mkdir(dirname(archivePath), { recursive: true });
    let archiveContent = "";
    if (existsSync(archivePath)) {
      archiveContent = await readFile(archivePath, "utf-8");
      const existingItems = this.serializer.deserialize(archiveContent);
      if (existingItems.length + items.length > _FileSystemKnowledgeRepository.ARCHIVE_SIZE_LIMIT) {
        console.warn(`Archive file too large: ${archivePath}. Rotating...`);
        const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
        const rotatedPath = archivePath.replace(".md", `-${timestamp}.md`);
        await writeFile(rotatedPath, archiveContent, "utf-8");
        const categoryName = this.capitalize(category.getValue());
        const languageName = this.capitalize(language.getValue());
        archiveContent = `# Archive: ${categoryName} - ${languageName}

`;
      }
    } else {
      const categoryName = this.capitalize(category.getValue());
      const languageName = this.capitalize(language.getValue());
      archiveContent = `# Archive: ${categoryName} - ${languageName}

`;
    }
    for (const item of items) {
      archiveContent += this.serializer.itemToMarkdown(item);
    }
    await writeFile(archivePath, archiveContent, "utf-8");
  }
  /**
   * ファイルパスを取得
   */
  getFilePath(category, language) {
    return join(this.baseDir, category.getValue(), `${language.getValue()}.md`);
  }
  /**
   * アーカイブパスを取得
   */
  getArchivePath(category, language) {
    return join(this.baseDir, "archive", category.getValue(), `${language.getValue()}.md`);
  }
  /**
   * すべての知見を読み込む（MCP検索用）
   */
  async findAll() {
    const result = /* @__PURE__ */ new Map();
    if (!existsSync(this.baseDir)) {
      return result;
    }
    const entries = await readdir(this.baseDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === "archive") {
        continue;
      }
      const categoryName = entry.name;
      const categoryPath = join(this.baseDir, categoryName);
      try {
        const category = Category.fromString(categoryName);
        const languageMap = /* @__PURE__ */ new Map();
        const categoryEntries = await readdir(categoryPath, { withFileTypes: true });
        for (const file of categoryEntries) {
          if (!file.isFile() || !file.name.endsWith(".md")) {
            continue;
          }
          const languageName = file.name.replace(/\.md$/, "");
          try {
            const language = Language.fromString(languageName);
            const items = await this.findByPath(category, language);
            languageMap.set(languageName, [...items]);
          } catch (error) {
            console.warn(`Invalid language file: ${file.name}`, error);
          }
        }
        if (languageMap.size > 0) {
          result.set(categoryName, languageMap);
        }
      } catch (error) {
        console.warn(`Invalid category directory: ${categoryName}`, error);
      }
    }
    return result;
  }
  /**
   * 文字列の先頭を大文字に
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

// src/infrastructure/MarkdownSerializer.ts
var MarkdownSerializer = class {
  /**
   * 知見アイテムをMarkdown形式にシリアライズ
   */
  serialize(category, language, items) {
    const categoryName = this.capitalize(category.getValue());
    const languageName = this.capitalize(language.getValue());
    let content = `# ${categoryName} - ${languageName}

`;
    for (const item of items) {
      content += this.itemToMarkdown(item);
    }
    return content;
  }
  /**
   * 個別アイテムをMarkdownに変換（公開メソッド）
   */
  itemToMarkdown(item) {
    const plain = item.toPlainObject();
    let md = `## ${plain.title}

`;
    md += `- **\u91CD\u8981\u5EA6**: ${plain.severity}
`;
    md += `- **\u767A\u751F\u56DE\u6570**: ${plain.occurrences}
`;
    md += `- **\u6982\u8981**: ${plain.summary}
`;
    md += `- **\u63A8\u5968\u5BFE\u5FDC**: ${plain.recommendation}
`;
    if (plain.codeExample && (plain.codeExample.bad || plain.codeExample.good)) {
      md += `- **\u30B3\u30FC\u30C9\u4F8B**:
`;
      if (plain.codeExample.bad) {
        md += `  \`\`\`
  // NG
  ${plain.codeExample.bad}
  \`\`\`
`;
      }
      if (plain.codeExample.good) {
        md += `  \`\`\`
  // OK
  ${plain.codeExample.good}
  \`\`\`
`;
      }
    }
    if (plain.targetFile) {
      md += `- **\u5BFE\u8C61\u30D5\u30A1\u30A4\u30EB\u4F8B**: \`${plain.targetFile}\`
`;
    }
    if (plain.references && plain.references.length > 0) {
      md += `- **\u53C2\u7167PR**:
`;
      plain.references.forEach((ref) => {
        md += `  - ${ref}
`;
      });
    }
    md += `
---
`;
    return md;
  }
  /**
   * Markdownテキストから知見アイテムをデシリアライズ
   */
  deserialize(markdown) {
    const knowledgeItems = [];
    const contentWithoutTitle = markdown.replace(/^#\s+.+\n\n?/m, "");
    const sections = contentWithoutTitle.split(/^## /m).filter((s) => s.trim());
    for (const section of sections) {
      try {
        const item = this.parseSection(section);
        if (item) {
          knowledgeItems.push(item);
        }
      } catch (error) {
        console.warn("Failed to parse section:", error);
      }
    }
    return knowledgeItems;
  }
  /**
   * セクションをパースしてKnowledgeItemを作成
   */
  parseSection(section) {
    const lines = section.split("\n");
    const title = lines[0].trim();
    if (!title)
      return null;
    const severityMatch = section.match(/\*\*重要度\*\*:\s*(.+)/);
    const occurrencesMatch = section.match(/\*\*発生回数\*\*:\s*(\d+)/);
    const summaryMatch = section.match(/\*\*概要\*\*:\s*(.+)/);
    const recommendationMatch = section.match(/\*\*推奨対応\*\*:\s*(.+)/);
    const targetFileMatch = section.match(/\*\*対象ファイル例\*\*:\s*`(.+?)`/);
    const referencesSection = section.match(/\*\*参照PR\*\*:\s*([\s\S]*?)(?=\n\n|---|\n-\s+\*\*|$)/);
    const references = [];
    if (referencesSection) {
      const urls = referencesSection[1].match(/https?:\/\/[^\s]+/g);
      if (urls) {
        references.push(...urls);
      }
    }
    const occurrences = occurrencesMatch ? parseInt(occurrencesMatch[1], 10) : 1;
    const item = KnowledgeItem.fromSerialized({
      title,
      severity: severityMatch ? severityMatch[1].trim() : void 0,
      summary: summaryMatch ? summaryMatch[1].trim() : "",
      recommendation: recommendationMatch ? recommendationMatch[1].trim() : "",
      occurrences,
      file_path: targetFileMatch ? targetFileMatch[1].trim() : void 0,
      pr_urls: references
    });
    return item;
  }
  /**
   * 文字列の先頭を大文字に
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

// src/domain/services/matchers/ExactTitleMatcher.ts
var ExactTitleMatcher = class {
  findSimilar(newItem, existing) {
    const normalizedNewTitle = newItem.title.toLowerCase();
    const similar = existing.find(
      (item) => item.getTitle().toLowerCase() === normalizedNewTitle
    );
    return similar || null;
  }
};

// src/index.ts
var MAX_INPUT_SIZE = 10 * 1024 * 1024;
var MAX_KNOWLEDGE_ITEMS = 1e3;
async function main() {
  try {
    const inputPath = process.argv[2];
    if (!inputPath) {
      console.error("Usage: node dist/index.js <knowledge.json>");
      process.exit(1);
    }
    const jsonData = await readFile2(inputPath, "utf-8");
    if (jsonData.length > MAX_INPUT_SIZE) {
      throw new Error(
        `JSON file too large: ${jsonData.length} bytes (max: ${MAX_INPUT_SIZE})`
      );
    }
    let data;
    try {
      data = JSON.parse(jsonData);
    } catch (parseError) {
      throw new Error(`Invalid JSON format: ${parseError.message}`);
    }
    if (!data.knowledge_items || !Array.isArray(data.knowledge_items)) {
      throw new Error("Invalid JSON format: missing knowledge_items array");
    }
    if (data.knowledge_items.length > MAX_KNOWLEDGE_ITEMS) {
      throw new Error(
        `Too many knowledge items: ${data.knowledge_items.length} (max: ${MAX_KNOWLEDGE_ITEMS})`
      );
    }
    console.log(`Processing ${data.knowledge_items.length} knowledge items...`);
    const serializer = new MarkdownSerializer();
    const repository = new FileSystemKnowledgeRepository(
      process.cwd(),
      serializer
    );
    const matcher = new ExactTitleMatcher();
    const useCase = new ApplyKnowledgeUseCase(repository, matcher);
    const grouped = groupByCategory(data.knowledge_items);
    let totalUpdated = 0;
    const entries = Object.entries(grouped);
    const concurrencyLimit = 10;
    for (let i = 0; i < entries.length; i += concurrencyLimit) {
      const batch = entries.slice(i, i + concurrencyLimit);
      const results = await Promise.all(
        batch.map(async ([key, items]) => {
          try {
            const [category, language] = key.split("/");
            const count = await useCase.execute({
              category,
              language,
              knowledge_items: items
            });
            console.log(`Updated ${category}/${language}.md: ${count} items`);
            return items.length;
          } catch (fileError) {
            console.error(`Error updating ${key}: ${fileError.message}`);
            return 0;
          }
        })
      );
      totalUpdated += results.reduce((sum, count) => sum + count, 0);
    }
    console.log(`
Successfully processed ${totalUpdated} knowledge items`);
    if (data.skipped_comments && data.skipped_comments.length > 0) {
      console.log(`Skipped ${data.skipped_comments.length} comments`);
    }
  } catch (error) {
    console.error("Error:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
}
function groupByCategory(items) {
  const grouped = {};
  for (const item of items) {
    if (!item.category || !item.language) {
      console.warn("Skipping item: missing category or language");
      continue;
    }
    try {
      const category = Category.fromString(item.category);
      const language = Language.fromString(item.language);
      const key = `${category.getValue()}/${language.getValue()}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    } catch (validationError) {
      console.warn(`Skipping item with invalid category/language: ${validationError.message}`);
    }
  }
  return grouped;
}
main();
