import { resHandler, responseType } from '../_Interface/Common';
import { Response } from 'express'



// NOTE It handles all the requests 
const resHandler = (res: Response): resHandler => ({

    statusOk: <T>(data: T, messages: Array<string>) => {
        const payload: responseType<T>['statusOk'] = { data, messages };
        res.json(payload);
    },

    statusUnAuthorized: (messages) => {
        const payload: responseType<null>['statusUnAuthorized'] = { messages };
        res.status(401).json(payload);
    },

    statusUnValid: (messages = []) => {
        const payload: responseType<null>['statusUnValid'] = { messages };
        res.status(422).json({ messages });
    },

    statusError: (messages = []) => {
        const payload: responseType<null>['statusError'] = { messages };
        res.status(400).json({ messages });
    },
    statusServerError: (messages = []) => {
        const payload: responseType<null>['statusServerError'] = { messages };
        res.status(500).json({ messages });
    }

});


