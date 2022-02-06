class TooManyRequestsError extends Error {
  constructor(message) {
    super(message);
    this.name = "Too many requests";
  }
}

module.exports = TooManyRequestsError;
