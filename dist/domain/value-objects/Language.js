/**
 * プログラミング言語を表すValue Object
 */
export class Language {
    value;
    static KNOWN_LANGUAGES = [
        'java',
        'javascript',
        'typescript',
        'python',
        'nodejs',
        'go',
        'rust',
        'php',
        'perl',
        'ruby',
        'csharp',
        'cpp',
        'kotlin',
        'swift',
        'other'
    ];
    constructor(value) {
        this.value = value;
    }
    static fromString(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Language must be a non-empty string');
        }
        const normalized = value.toLowerCase();
        // 長さ制限
        if (normalized.length > 50) {
            throw new Error(`Language name too long: ${normalized.length} characters (max: 50)`);
        }
        // 英数字、ハイフン、ドット、アンダースコアのみ許可
        if (!/^[a-z0-9._-]+$/.test(normalized)) {
            throw new Error(`Invalid language name: ${value}. Only alphanumeric characters, dots, hyphens, and underscores are allowed`);
        }
        return new Language(normalized);
    }
    getValue() {
        return this.value;
    }
    isKnownLanguage() {
        return Language.KNOWN_LANGUAGES.includes(this.value);
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
        const ext = extension.toLowerCase().replace(/^\./, '');
        const extensionMap = {
            'java': 'java',
            'js': 'nodejs',
            'jsx': 'nodejs',
            'ts': 'typescript',
            'tsx': 'typescript',
            'py': 'python',
            'go': 'go',
            'rs': 'rust',
            'php': 'php',
            'pl': 'perl',
            'pm': 'perl',
            'rb': 'ruby',
            'cs': 'csharp',
            'cpp': 'cpp',
            'cc': 'cpp',
            'cxx': 'cpp',
            'kt': 'kotlin',
            'kts': 'kotlin',
            'swift': 'swift'
        };
        const language = extensionMap[ext] || 'other';
        return Language.fromString(language);
    }
}
//# sourceMappingURL=Language.js.map