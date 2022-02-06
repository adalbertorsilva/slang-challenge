const UnauthorizedError = require("./errors/unauthorized-error");
const BadRequestError = require("./errors/bad-request-error");
const TooManyRequestsError = require("./errors/too-many-requests-error");
const InternalServerError = require("./errors/internal-server-error");

const handleRequestErrors = (error) => {
  if (error.status === 401) throw new UnauthorizedError();
  if (error.status === 400) throw new BadRequestError();
  if (error.status === 429) throw new TooManyRequestsError();

  throw new InternalServerError(error.message);
};

module.exports = { handleRequestErrors };
