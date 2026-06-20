import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getAllAbuseWordsService,
  addAbuseWordsService,
} from "../services/abuseWord.service";

/**
 * GET /api/abuse-words
 * List all abuse words in the database.
 */
export const getAllAbuseWordsController = asyncHandler(
  async (req: Request, res: Response) => {
    const words = await getAllAbuseWordsService();

    return res.status(HTTPSTATUS.OK).json({
      message: "Abuse words fetched successfully",
      count: words.length,
      words,
    });
  }
);

/**
 * POST /api/abuse-words/add
 * Add new abuse word(s) to the database and reload the Trie.
 * Body: { words: string[] }
 */
export const addAbuseWordsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { words } = req.body;

    if (!words || !Array.isArray(words) || words.length === 0) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Please provide an array of words",
      });
    }

    const result = await addAbuseWordsService(words);

    return res.status(HTTPSTATUS.OK).json({
      message: `Added ${result.insertedCount} new abuse word(s)`,
      ...result,
    });
  }
);
