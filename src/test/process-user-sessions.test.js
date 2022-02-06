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
  });
});
