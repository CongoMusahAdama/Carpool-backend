import { NextFunction, Request, Response } from "express";
// import localLogger from "./local-logger";

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error occurred:", err); // future plan - implement logger for this instead

  // Default status code, error code, and error message
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let errorMessage = "Internal Server Error";

  let errorMessageLogger = err.message ?? "Internal Server Error";

  // Check if the error is a known error type
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    errorMessage = err.message;
    errorMessageLogger = err.message;
  }

  // localLogger.error(
  //   JSON.stringify({
  //     statusCode: statusCode,
  //     errorCode: errorCode,
  //     error: errorMessageLogger,
  //   })
  // );

  return res
    .status(statusCode)
    .json({ error: errorCode, message: errorMessage });
};
