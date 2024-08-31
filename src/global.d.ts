type Query = {
  limit?: number;
  offset?: number;
};

interface ResponseData<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
  };
}

interface ApiResponseError {
  status: number;
  message: string;
  errorName: string;
}

type ResponseController<T> = ResponseData<T> | ApiResponseError | Response<T>;
