const { config } = require("dotenv");
const { join } = require("path");

const loadEnv = () => {
  const env = process.env.NODE_ENV;
  const filename = `.env${env ? `.${env}` : ""}`;
  const path = join(process.cwd(), filename);
  config({ path });
};

module.exports = loadEnv;
