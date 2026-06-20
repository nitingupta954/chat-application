import "dotenv/config";
import mongoose from "mongoose";
import { Env } from "../config/env.config";
import AbuseWordModel from "../models/abuseWord.model";

/**
 * Default list of common abuse/profanity words to seed.
 * Add or remove words as needed for your application.
 */
const defaultAbuseWords: string[] = [
  // Common English profanity
  "fuck",
  "shit",
  "ass",
  "asshole",
  "bitch",
  "bastard",
  "damn",
  "dick",
  "piss",
  "crap",
  "cunt",
  "motherfucker",
  "fucker",
  "bullshit",
  "dumbass",
  "jackass",
  "idiot",
  "stupid",
  "moron",
  "retard",
  // Slurs and hate speech
  "nigger",
  "nigga",
  "faggot",
  "fag",
  "dyke",
  "tranny",
  "spic",
  "chink",
  "kike",
  "wetback",
  // Variants and compound words
  "fucking",
  "fucked",
  "shitty",
  "bitchy",
  "dickhead",
  "shithead",
  "douchebag",
  "douche",
  "whore",
  "slut",
  "twat",
  "wanker",
  "prick",
  "cock",
  "bollocks",
  // Indian/Hindi profanity & slangs
  "chutiya",
  "bhenchod",
  "behenchod",
  "madarchod",
  "gand",
  "gandu",
  "saala",
  "sala",
  "harami",
  "kamina",
  "kamine",
  "luda",
  "lauda",
  "laundia",
  "bhosad",
  "bhosadika",
  "bhosdike",
  "randi",
  "rndi",
  "saali",
  "sali",
  "kutta",
  "kutte",
  "kaminey",
  "chut",
  "tatte",
  "tatta",
];

const seedAbuseWords = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("Database connected for seeding");

    const wordDocs = defaultAbuseWords.map((word) => ({
      word: word.toLowerCase().trim(),
    }));

    // Use ordered: false to skip duplicates and continue inserting
    const result = await AbuseWordModel.insertMany(wordDocs, {
      ordered: false,
    }).catch((err) => {
      // BulkWriteError with code 11000 = duplicate key errors, which is expected
      if (err.code === 11000 || err.writeErrors) {
        console.log(
          `Inserted ${err.insertedDocs?.length ?? "some"} new words (skipped duplicates)`
        );
        return err.insertedDocs || [];
      }
      throw err;
    });

    if (Array.isArray(result)) {
      console.log(`Successfully seeded ${result.length} abuse words`);
    }

    const totalCount = await AbuseWordModel.countDocuments();
    console.log(`Total abuse words in database: ${totalCount}`);
  } catch (error) {
    console.error("Error seeding abuse words:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

seedAbuseWords();
