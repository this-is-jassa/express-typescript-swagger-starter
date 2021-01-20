import { Request, Response, NextFunction } from 'express';

export interface Common {
    Middleware: (req: Request, res: Response, next: NextFunction) => any
}

export interface resHandler {
    statusOk: <T>(data: T, messages: Array<string>) => any;
    statusServerError: (messages: Array<string>) => any;
    statusError: (messages: Array<string>) => any;
    statusUnAuthorized: (messages: Array<string>) => any;
    statusUnValid: (messages: Array<string>) => any;
}


export interface responseType<T> {
    statusOk: { data: T, messages: Array<string> };
    statusServerError: { messages: Array<string> };
    statusError: { messages: Array<string> }
    statusUnAuthorized: { messages: Array<string> }
    statusUnValid: { messages: Array<string> }
}

