import AbuseWordModel from "../models/abuseWord.model";

/**
 * Trie node for character-level prefix tree.
 */
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

 
class AbuseMasker {
  private root: TrieNode;
  private wordCount: number;

  constructor() {
    this.root = new TrieNode();
    this.wordCount = 0;
  }

 
  private insert(word: string): void {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    current.isEndOfWord = true;
  }

 
  private search(word: string): boolean {
    let current = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }

    return current.isEndOfWord;
  }
 
  async loadWords(): Promise<void> {
    // Reset the Trie
    this.root = new TrieNode();
    this.wordCount = 0;

    const abuseWords = await AbuseWordModel.find({}).select("word").lean();

    for (const doc of abuseWords) {
      if (doc.word && doc.word.trim()) {
        this.insert(doc.word.trim());
        this.wordCount++;
      }
    }

    console.log(`Abuse masker loaded ${this.wordCount} words into Trie`);
  }

  /**
   * Mask abusive words in the given text.
   *
   * Splits text on word boundaries, checks each token against the Trie,
   * and replaces matches with asterisks matching the word length.
   * Preserves original spacing, punctuation, and casing of non-abusive text.
   *
   * @param text - The message content to filter
   * @returns The filtered text with abuse words replaced by asterisks
   */
  mask(text: string): string {
    if (!text || this.wordCount === 0) {
      return text;
    }

    // Split text into tokens (words) and separators (spaces, punctuation)
    // This regex captures word characters as tokens and everything else as separators
    const parts = text.split(/(\b)/);

    const result: string[] = [];

    for (const part of parts) {
      // Only check actual word tokens (not spaces/punctuation)
      if (/^\w+$/.test(part) && this.search(part)) {
        // Replace with asterisks matching the word length
        result.push("*".repeat(part.length));
      } else {
        result.push(part);
      }
    }

    return result.join("");
  }

  /**
   * Get the number of words currently loaded in the Trie.
   */
  getWordCount(): number {
    return this.wordCount;
  }
}

// Singleton instance
const abuseMasker = new AbuseMasker();
export default abuseMasker;
