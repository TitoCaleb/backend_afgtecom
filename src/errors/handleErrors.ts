import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const ApiReponseError = (e: any, res: Response): ApiResponseError => {
  switch (e.name) {
    case 'NotFoundException': {
      res.status(HttpStatus.NOT_FOUND);
      return {
        status: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
    default: {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }
  }
};
