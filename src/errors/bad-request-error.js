class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "Bad Request";
  }
}

module.exports = BadRequestError;
