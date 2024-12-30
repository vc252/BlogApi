class customImageFileError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ImageFileError';
  }
}

export default customImageFileError;