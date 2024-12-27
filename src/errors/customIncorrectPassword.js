class customIncorrectPassword extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectPasswordError';
    this.statusCode = 403;
  }
}

export default customIncorrectPassword;