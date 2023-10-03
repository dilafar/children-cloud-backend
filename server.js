import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  logger.info(`server is running on port ${PORT}`);
});
