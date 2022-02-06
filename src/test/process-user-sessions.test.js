const { processUserSessions } = require("../process-user-sessions");
const userActivities = require("../get-user-activities");
const mockUserActivities = require("./mocks/mock-user-activities");

jest.mock("../get-user-activities");

const getDistinctUserIds = () => {
  const idsSet = new Set();
  mockUserActivities.activities.forEach(({ user_id }) => {
    idsSet.add(user_id);
  });

  return [...idsSet];
};
describe("User Sessions", () => {
  let result;
  describe("#processUserSessions", () => {
    beforeAll(async () => {
      userActivities.getUsersActivities.mockResolvedValue(mockUserActivities);
      result = await processUserSessions();
    });
    it("should return an object unique keys with user ids", () => {
      const userSessionKeys = Object.keys(result.user_sessions);
      const distinctUserIds = getDistinctUserIds();
      expect(userSessionKeys).toHaveLength(distinctUserIds.length);
      expect(userSessionKeys).toIncludeAllMembers(distinctUserIds);
    });

    it("should have an started_at attibute", () => {
      const userSessionKeys = Object.keys(result.user_sessions);
      const sessionActivities = [];

      userSessionKeys.forEach((key) => {
        sessionActivities.push(...result.user_sessions[key]);
      });

      sessionActivities.forEach((sessionActivity) => {
        expect(sessionActivity).toHaveProperty("started_at");
      });
    });

    it("should order session activities by started_at attibute", () => {
      const userSessionKeys = Object.keys(result.user_sessions);
      const sessionReport = result.user_sessions[userSessionKeys[0]];
      let actualStartedAt;
      let nextStartedAt;

      for (i = 0; i < sessionReport.length; i++) {
        actualStartedAt = sessionReport[i].started_at;
        nextStartedAt = sessionReport[i + 1] ? sessionReport[i + 1].started_at : null;
        if (nextStartedAt) expect(new Date(actualStartedAt)).toBeBefore(new Date(nextStartedAt));
      }
    });
  });
});
