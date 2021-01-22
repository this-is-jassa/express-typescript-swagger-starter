import { Request } from 'express';
import { SecurityName } from './Auth';
import * as jwt from "jsonwebtoken";
import { config } from '../config';

export function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    if (securityName === SecurityName.JWT) {

        let bearerToken = request.headers['Authorization'] + '';
        const token = bearerToken.split(' ')[1];

        return new Promise((resolve, reject) => {
            if (!token) reject(new Error('JWT does not contain required scope.'));

            jwt.verify(token, config.jwt_secret, function (err: any, decoded: any) {
                if (err) {
                  reject(err);
                } else {
                    
                  if(!scopes) return resolve(decoded);

                  // Check if JWT contains all required scopes
                  for (let scope of scopes) {
                    if (!decoded.scopes.includes(scope)) {
                      reject(new Error("JWT does not contain required scope."));
                    }
                  }
                  resolve(decoded);
                }
              });

        })

    }
    else {
        throw "No Such Strategy Auth Stretigy exists.";
    }


}
