import { Request, Response, NextFunction } from 'express';

export interface Common {
    Middleware: (req: Request, res: Response, next: NextFunction) => any,
}



// 200 | 201
export type statusOk<T> = {
    data: T;
    errors: Array<string>;
}

// 400
export type statusError = {
    errors: Array<string>
}

// 401
export type statusUnAuthorized = {
    errors: Array<string>
}

// 500
export type statusServerError = {
    errors: Array<string>
}

// 422
export type statusUnValid = {
    errors: Array<string>
}


