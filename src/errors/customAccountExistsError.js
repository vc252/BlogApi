class customAccountExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccountExistsError';
    this.statusCode = 403;
  }
}

export default customAccountExistsError;