const axios = require("axios");
const { getUsersActivities } = require("../get-user-activities");

jest.mock("axios");

describe("User Activities", () => {
  describe("#getUsersActivities", () => {
    it("should make an api get request", async () => {
      axios.get.mockResolvedValue({ status: 200, data: {} });
      await getUsersActivities();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(process.env.USER_ACTIVITIES_URL, {
        headers: { Authorization: process.env.AUTHORIZATION_HEADER_TOKEN },
      });
    });

    describe("when the api request is successful", () => {
      it("should return the response data", async () => {
        const mockResponseData = {
          activities: [
            {
              id: 198891,
              user_id: "emr5zqid",
              answered_at: "2021-09-13T02:38:34.117-04:00",
              first_seen_at: "2021-09-13T02:38:16.117-04:00",
            },
          ],
        };

        axios.get.mockResolvedValue({ status: 200, data: mockResponseData });

        const functionReturn = await getUsersActivities();
        expect(functionReturn).toEqual(mockResponseData);
      });
    });
  });
});
