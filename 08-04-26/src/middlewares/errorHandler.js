import { errorResponse } from "../utils/response.js";
import { AppError } from "../utils/appError.js";

export function errorHandler(err, req, res, next) {

  if (err instanceof AppError) {
    return errorResponse(
      res,
      err.statusCode,
      err.message,
      err.details
    );
  }

  return errorResponse(
    res,
    500,
    "Erro interno do servidor"
  );
}