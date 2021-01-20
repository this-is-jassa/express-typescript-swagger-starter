import { Request, Response, NextFunction } from 'express';

export interface Common {
  Middleware: <T>(
    req: Request,
    res: Response<T>,
    next: NextFunction
  ) => Promise<Response<T>>;
}


export interface resHandler {
  statusOk: <T>(data: T, messages: Array<string>) => void;
  statusServerError: (messages: Array<string>) => void;
  statusError: (messages: Array<string>) => void;
  statusUnAuthorized: (messages: Array<string>) => void;
  statusUnValid: (messages: Array<string>) => void;
}

export interface responseType<T> {
  statusOk: { data: T; messages: Array<string> };
  statusServerError: { messages: Array<string> };
  statusError: { messages: Array<string> };
  statusUnAuthorized: { messages: Array<string> };
  statusUnValid: { messages: Array<string> };
}
