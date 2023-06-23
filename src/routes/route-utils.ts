import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../dto/common';
import { Response } from 'express';

const handleGenericError = (err: Error, res: Response) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message
  } as ApiError);
};

const handleError = (code: number, message: string, res: Response) => {
  res.status(code).json({
    code: code,
    message: message
  } as ApiError);
};

export { handleGenericError, handleError };
