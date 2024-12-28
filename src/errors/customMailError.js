class customMailError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MainError';
    this.statusCode = 403;
  }
}

export default customMailError;