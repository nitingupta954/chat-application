import AbuseWordModel from "../models/abuseWord.model";
import abuseMasker from "../lib/abuseMasker";

/**
 * Get all abuse words from the database.
 */
export const getAllAbuseWordsService = async () => {
  const words = await AbuseWordModel.find({})
    .select("word createdAt")
    .sort({ word: 1 })
    .lean();

  return words;
};

/**
 * Add one or more abuse words to the database and reload the Trie.
 */
export const addAbuseWordsService = async (words: string[]) => {
  const wordDocs = words
    .map((w) => w.toLowerCase().trim())
    .filter((w) => w.length > 0)
    .map((word) => ({ word }));

  if (wordDocs.length === 0) {
    throw new Error("No valid words provided");
  }

  // Use ordered: false to skip duplicates and continue inserting
  let insertedCount = 0;
  try {
    const result = await AbuseWordModel.insertMany(wordDocs, {
      ordered: false,
    });
    insertedCount = result.length;
  } catch (err: any) {
    // BulkWriteError with duplicate key errors is expected
    if (err.code === 11000 || err.writeErrors) {
      insertedCount = err.insertedDocs?.length ?? 0;
    } else {
      throw err;
    }
  }

  // Reload the Trie with updated word list
  await abuseMasker.loadWords();

  return {
    insertedCount,
    totalWords: abuseMasker.getWordCount(),
  };
};
