import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const certificateCert = path.join(
  __dirname,
  "..",
  "..",
  "children-cloud-backend",
  "cert",
  "cert.pem",
);
const certificateKey = path.join(
  __dirname,
  "..",
  "..",
  "children-cloud-backend",
  "cert",
  "key.pem",
);
let dbconnection;

export const connect = () => {
  if (dbconnection) return;

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslKey: certificateKey,
      sslCert: certificateCert,
      serverApi: {
        version: "1",
      },
    })
    .then((connect) => {
      dbconnection = connect.connection;
      logger.info(`Connected to MongoDB`);
    })
    .catch((err) => {
      logger.error("Error:", err);
    });
};

export const disconnect = (done) => {
  mongoose.disconnect(done);
};
