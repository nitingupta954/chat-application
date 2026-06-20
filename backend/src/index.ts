import "dotenv/config";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import passport from "passport";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import connectDatabase from "./config/database.config";
import { initializeSocket } from "./lib/socket";
import routes from "./routes";
import abuseMasker from "./lib/abuseMasker";

import "./config/passport.config";

const app = express();
app.set("trust proxy", 1);
const server = http.createServer(app);

//socket
initializeSocket(server);

// Shared initialization promise — ensures DB + abuse masker Trie are ready
// before any request is processed (critical for Vercel serverless cold starts)
let initPromise: Promise<void> | null = null;

const initialize = async () => {
  await connectDatabase();
  await abuseMasker.loadWords();
};

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  Env.FRONTEND_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(passport.initialize());

// Ensure DB + abuse masker are initialized before handling any request
// On Vercel serverless, requests can arrive before the cold-start init completes
app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (initPromise) {
    await initPromise;
  }
  next();
});

app.get(
  "/health",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Server is healthy",
      status: "OK",
    });
  })
);

app.use("/api", routes);

if (Env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "../../client/dist");

  //Serve static files
  app.use(express.static(clientPath));

  app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.use(errorHandler);

if (!process.env.VERCEL) {
  server.listen(Env.PORT, async () => {
    await initialize();
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
  });
} else {
  // On Vercel, start init immediately on cold start
  initPromise = initialize();
}

export default app;
