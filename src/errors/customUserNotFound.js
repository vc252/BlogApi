class customUserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFound';
    this.statusCode = 403;
  }
}

export default customUserNotFoundError;