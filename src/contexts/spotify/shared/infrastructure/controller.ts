import { Request, Response } from "express";
import { ControllerRequest, Controller } from "../models/controller";
import { isSpotifySession, SpotifySession } from "../models/session";

const convertExpressRequest = (request: Request, session: SpotifySession) => {
  return {
    // token: session.access_token,
    body: request.body,
    query: request.query,
    params: request.params,
    headers: request.headers,
    ip: request.ip,
    method: request.method,
    path: request.path,
    session
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

    const profile = req.session.profile;
    if (!isSpotifySession(profile)) return res.status(400).send({ message: "Invalid user session" });

    const customRequest = convertExpressRequest(req, profile);

    try {
      const { statusCode, message, data } = await controller(customRequest);

      res.status(statusCode).send({ message, data });
    } catch (err) {
      res.status(500).send({ message: (err as Error).message });
    }
  }
}
