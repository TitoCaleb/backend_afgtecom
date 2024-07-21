import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { customLog } from 'src/config/logResponse';

export const ApiReponseError = (e: any, res: Response): ApiResponseError => {
  customLog(e.message, 'error');
  switch (e.name) {
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
    default: {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        errorName: e.name,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
};
