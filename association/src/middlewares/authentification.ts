import { IncomingMessage } from "node:http";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import axios from 'axios'
import { NextFunction, Request, Response } from "express";

/**
 * this middleware is used to check authentification of users before starting or using a vehicule
 */
export async function socketAuth(socket: Socket, next: (err?: ExtendedError | undefined) => void) {
    try {
        let token = socket.handshake.auth.token;
        let response = await axios.get(`http://${process.env.AUTH_SERVICE}/`, {
            headers: {
                auth: token.toString()
            }
        })
        let status = response.status
        if (status === 200) {
            next()
        } else {
            next(new Error("unauthorized to use this endpoint"));
        }
    } catch(e) {
        next(new Error("not authorized"))
    }
}

export function checkAuth(role: string | string[] | undefined) {
    let query = '';
    if (role !== undefined) {
        if (typeof role === 'string')
            query = `?role=${role}`
        else {
            query = '?' + role.map(e => `role[]=${e}`).join("&");
        }
    }

    return async function auth(_req: Request, _res: Response, _next: NextFunction) {
        try {
            let token = _req.headers.auth;
            let response = await axios.get(`http://${process.env.AUTH_SERVICE}/check/${query}`, {
                headers: {
                    auth: token?.toString()
                }
            })
    
            if (response.status === 200 && response.data?.auth === true) {
                _next()
            } else {
                _res.status(401).json({
                    message: "unauthorized"
                })
            }
        } catch (e) {
            _res.status(401).json({
                message: "unauthorized"
            })
        }
    }
}