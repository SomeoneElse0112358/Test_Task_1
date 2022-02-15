const dotenv = require("dotenv");
const path = require("path");
const { cleanEnv, str } = require("envalid");

dotenv.config({ path: path.resolve(".env") });

const env = cleanEnv(process.env, {
  PORT: str(),
  HOST: str(),
  DB_PORT: str({ default: "27017" }),
  DB_NAME: str({ default: "testdb" }),
});

module.exports = {
  host: env.HOST,
  port: env.PORT,
  database: {
    host: env.HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    url: `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  },
};
