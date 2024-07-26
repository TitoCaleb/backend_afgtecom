import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { customLog } from 'src/config/logResponse';

export const ApiResponseError = (e: any, res: Response): ApiResponseError => {
  customLog(e.message, 'error');
  switch (e.name) {
    case 'HttpException': {
      res.status(e.status);
      return {
        errorName: e.name,
        status: e.status,
        message: e.message,
      };
    }
    case 'ValidationError': {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        errorName: e.name,
        status: HttpStatus.BAD_REQUEST,
        message: e.errors,
      };
    }
    case 'NotFoundException': {
      res.status(HttpStatus.NOT_FOUND);
      return {
        errorName: e.name,
        status: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
    case 'ZodError': {
      res.status(HttpStatus.BAD_REQUEST);
      return {
        errorName: e.name,
        status: 400,
        message: e.issues,
      };
    }
    default: {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        errorName: e.name,
        status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
};
