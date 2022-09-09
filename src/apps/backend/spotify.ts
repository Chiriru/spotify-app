//This belongs outside, maybe in the server.ts file, as it is not required at all in here 

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, "./.env") });

import { stringify } from "query-string";
import { safeJoin } from "../../contexts/spotify/shared/spotify";
import { randomBytes } from "crypto";

const response_type = "code";
const app_scope = process.env.APP_SCOPES || "";
const app_id = process.env.APP_ID || "";
const app_redirect_uri = process.env.REDIRECT_URI || "";
const getRandomState = () => randomBytes(64).toString("hex");

const AUTHORIZATION_URL = "https://accounts.spotify.com/authorize";
export const getAuthorizationURL = (customState?: string) => {
  const queryObj = {
    response_type,
    client_id: app_id,
    scope: app_scope,
    redirect_uri: app_redirect_uri,
    state: customState ? customState : getRandomState()
  }
  const query = `?${stringify(queryObj)}`;
  return safeJoin(AUTHORIZATION_URL, query);
}
