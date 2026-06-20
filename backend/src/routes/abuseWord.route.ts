import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import {
  getAllAbuseWordsController,
  addAbuseWordsController,
} from "../controllers/abuseWord.controller";

const abuseWordRoutes = Router()
  .use(passportAuthenticateJwt)
  .get("/", getAllAbuseWordsController)
  .post("/add", addAbuseWordsController);

export default abuseWordRoutes;
