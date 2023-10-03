import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { connect } from "./utils/dbConnect.js";
import apiRouter from "./routes/index.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import logger from "./utils/logger.js";
import hpp from "hpp";
import "./passport.js";

const app = express();

//secure http header
app.use(helmet());

//limit request from login
const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: "Too many request,try again later",
});

app.use("/api/v1/user/login", limiter);

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//data sanitization against Nosql query injection
app.use(ExpressMongoSanitize());

//data sanitization against XSS (clean malisius HTML codes)
app.use(xss());

//prevent parameter pollution
app.use(
  hpp({
    whitelist: ["morning", "medicineName", "evening", "date", "status"],
  }),
);

app.use(express.json());
app.use(bodyParser.json());

app.use(
  session({
    secret: "sample secret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

connect();

app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
