const { version } = require("../../package.json");
const { host, port } = require("../config.js");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Test Task docs",
    version,
  },
  servers: [
    {
      url: `http://${host}:${port}/api`,
    },
  ],
};

module.exports = swaggerDef;
