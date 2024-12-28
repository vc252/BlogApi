class customOtpVerificationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OtpVerificationError';
    this.statusCode = 403;
  }
}

export default customOtpVerificationError;