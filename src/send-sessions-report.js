const axios = require("axios");
const { handleRequestErrors } = require("./handle-request-errors");

const sendSessionsReport = async (sessionsReport) => {
  await axios
    .post(process.env.USER_SESSIONS_URL, sessionsReport, {
      headers: { Authorization: process.env.AUTHORIZATION_HEADER_TOKEN },
    })
    .catch((error) => handleRequestErrors(error));
};

module.exports = { sendSessionsReport };
