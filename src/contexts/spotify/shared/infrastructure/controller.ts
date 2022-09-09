import { Request, Response } from "express";
import { ControllerRequest, Controller } from "../models/controller";

const convertExpressRequest = (request: Request, token: string) => {
  return {
    token,
    body: request.body,
    query: request.query,
    params: request.params,
    headers: request.headers,
    ip: request.ip,
    method: request.method,
    path: request.path
  } as ControllerRequest;
}
// For now, token validation will be OFF because the method to validate it
// is to make an extra request, and that might be a bother for Spotify's rate limit
// and also performance
// export const validateToken = async (token: string) => {
//   try {
//     return typeof (await getUserData(token)).id === "string";
//   } catch (err) {
//     return false;
//   }
// }

export const useController = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    console.log(req.body);
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: "Missing Authorization Header" });

    const customRequest = convertExpressRequest(req, token);

    try {
      const { statusCode, message, data } = await controller(customRequest);

      res.status(statusCode).send({ message, data });
    } catch (err) {
      res.status(500).send({ message: (err as Error).message });
    }
  }
}

