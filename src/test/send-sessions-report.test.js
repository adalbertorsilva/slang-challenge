const axios = require("axios");
const { sendSessionsReport } = require("../send-sessions-report");
const mockUserSessionsReport = require("./mocks/mock-sessions-report");

jest.mock("axios");

describe("Sessions Report", () => {
  describe("#sendSessionsReport", () => {
    it("should make an api post request", async () => {
      axios.post.mockResolvedValue({ status: 204 });
      await sendSessionsReport(mockUserSessionsReport);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(process.env.USER_SESSIONS_URL, mockUserSessionsReport, {
        headers: { Authorization: process.env.AUTHORIZATION_HEADER_TOKEN },
      });
    });
  });
});
