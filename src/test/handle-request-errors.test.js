const { handleRequestErrors } = require("../handle-request-errors");

const UnauthorizedError = require("../errors/unauthorized-error");
const BadRequestError = require("../errors/bad-request-error");
const TooManyRequestsError = require("../errors/too-many-requests-error");
const InternalServerError = require("../errors/internal-server-error");

describe("Request errors handler", () => {
  describe("handleRequestErrors", () => {
    describe("when error has an 401 status", () => {
      it("should throw an UnathorizedError", () => {
        const error = { status: 401 };
        expect(() => handleRequestErrors(error)).toThrow(UnauthorizedError);
      });
    });

    describe("when error has an 400 status", () => {
      it("should throw an BadRequestError", () => {
        const error = { status: 400 };
        expect(() => handleRequestErrors(error)).toThrow(BadRequestError);
      });
    });

    describe("when error has an 429 status", () => {
      it("should throw an BadRequestError", () => {
        const error = { status: 429 };
        expect(() => handleRequestErrors(error)).toThrow(TooManyRequestsError);
      });
    });

    describe("when error has no status matching", () => {
      it("should throw an InternalServerError", () => {
        const error = { status: 500 };
        expect(() => handleRequestErrors(error)).toThrow(InternalServerError);
      });
    });
  });
});
