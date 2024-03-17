class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  // caso não informado o status code será 400
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
