const axios = require("axios");

const { handleRequestErrors } = require("./handle-request-errors");

const getUsersActivities = async () => {
  const response = await axios
    .get(process.env.USER_ACTIVITIES_URL, {
      headers: { Authorization: process.env.AUTHORIZATION_HEADER_TOKEN },
    })
    .catch((error) => handleRequestErrors(error));
  return response.data;
};

module.exports = {
  getUsersActivities,
};
