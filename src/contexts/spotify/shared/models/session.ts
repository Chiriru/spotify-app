import { v4 as generateUUID, validate as validateUUID } from "uuid";

declare module "express-session" {
  interface SessionData {
    profile: SpotifySession
  }
}

export interface SpotifySession {
  uuid: string,
  access_token : string,
  refresh_token: string,
  last_refresh: number,
  access_token_duration: number
}
export const isSpotifySession = (maybeSession: any): maybeSession is SpotifySession => {
  if (!maybeSession || typeof maybeSession !== "object") return false;

  const assumeSession = maybeSession as SpotifySession;

  return (typeof assumeSession.uuid === "string" && validateUUID(assumeSession.uuid))
    && (typeof assumeSession.access_token === "string")
    && (typeof assumeSession.refresh_token === "string")
    && (typeof assumeSession.last_refresh === "number")
    && (typeof assumeSession.access_token_duration === "number");
}
// 1 hour
const ACCESS_TOKEN_LIFESPAN = 1 * 60 * 60 * 1000;
export const createSession = (access_token: string, refresh_token: string, access_token_duration: number = ACCESS_TOKEN_LIFESPAN): SpotifySession => {
  return {
    uuid: generateUUID(),
    access_token,
    refresh_token,
    last_refresh: new Date().getTime(),
    access_token_duration: access_token_duration
  }
}