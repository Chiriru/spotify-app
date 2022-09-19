import { Router } from "express";
import { APP_ENV as ENV } from "../spotify";
import { createSession, isSpotifySession, SpotifySession } from "../../../contexts/spotify/shared/models/session";
import { getAuthorizationURL, getNewToken, getTokenFromCode } from "../../../contexts/spotify/User/application/user.useCases";
import { LoggedInResponse, LoggedOutResponse } from "../models/auth.response";

export const auth = Router();
const { app_id, app_scope, app_secret, authorization_redirect } = ENV;

const tokenIsValid = ({ last_refresh, access_token_duration }: SpotifySession) => {
  const deadline = last_refresh + (access_token_duration * 1000);

  return deadline > new Date().getTime();
}

auth.get("/me", (req, res) => {

  const loggedIn = (req.session.profile !== undefined) && isSpotifySession(req.session.profile);
  const authorization_url = getAuthorizationURL({ app_id, app_scope, authorization_redirect });

  console.log(req.session.cookie.expires)
  if (!loggedIn) {
    const response: LoggedOutResponse = {
      loggedIn,
      authorization_url
    };
    return res.status(200).send(response);
  }

  const profile = req.session.profile as SpotifySession;
  const validToken = tokenIsValid(profile);
  const response: LoggedInResponse = {
    loggedIn,
    authorization_url: getAuthorizationURL({ app_id, app_scope, authorization_redirect }),
    validToken,
    // THIS IS DEV ONLY; SHOULD BE DELETED,
    profile
  };

  return res.status(200).send(response);
})
auth.get("/authorize", async (req, res) => {
  const { code, state } = req.query;

  if (!code) return res.status(400).send({ message: "Missing code" });
  if (!state) return res.status(400).send({ message: "Missing state" });
  
  const response = await getTokenFromCode({ code: code as string, app_id, app_secret, authorization_redirect });
  // THis might not be the safest approach, putting the refresh token on the session
  // which could lead to it being leaked (i hope not)
  // But its a good flow, after the access_token is expired, the client can go to /refresh to get a new one
  req.session.profile = createSession(response.access_token, response.refresh_token, Number.parseInt(response.expires_in));

  return res.status(200).send({ message: "Successfully authorized" });
})
auth.get("/refresh", async (req, res) => {
  // TODO refresh Cookie with new access token
  // maybe get rid of the refresh token inside the session
  // and store it locally in a map, key would be the user uuid (that is in the session)
  // and the value would be the refresh token, the cookie would only hold the access token
  const { profile } = req.session;
  if (!profile || !isSpotifySession(profile)) return res.status(401).send({ message: "Invalid session" });

  try {
    const { refresh_token: oldRefreshToken } = profile;
    const response = await getNewToken({ app_id, app_secret, refresh_token: oldRefreshToken});
    const { access_token: NewAccessToken, refresh_token: NewRefreshToken, expires_in } = response;
  
    const newSession = createSession(NewAccessToken, NewRefreshToken || oldRefreshToken, Number.parseInt(expires_in));
    req.session.profile = newSession;
    // I dont know if this is neccesary, if its is like, when the cookie is already created you have to update the
    // max age manually, or if just setting its properties refreshes the cookie?
    req.session.resetMaxAge();
  
    return res.status(200).send({ message: "Successfully refreshed" });
  } catch (err) {
    // Profile is deleted because it is assumed that the error was caused 
    // due to the refresh token expiring, needing a new login
    req.session.profile = undefined;

    return res.status(500).send( { message: "Internal error, login again" });
  }
});
