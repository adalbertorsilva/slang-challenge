class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "Internal server error";
  }
}

module.exports = InternalServerError;
