// Authorization
import { stringify } from "query-string";
import { randomBytes } from "crypto";
import { postRequest } from "@spotify/shared/request"
import { safeJoin } from "@spotify/shared/spotify";
import { RequestOptions } from "@spotify/shared/models/request.options";
import { getAccountsURLFromPathname } from "@spotify/shared/spotify";
import { RefreshedToken, CreatedToken, AuthorizationMetadata, TokenCreationOptions, TokenRefreshOptions } from "../model/auth";

const getRandomState = () => randomBytes(64).toString("hex");
const getAppAuthorization = (client_id: string, client_secret: string) => Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const AUTHORIZATION_PATH = "/authorize";
const AUTHORIZATION_URL = getAccountsURLFromPathname(AUTHORIZATION_PATH);
const RESPONSE_TYPE = "code";
export const getAuthorizationURL = ({ app_id, app_scope, authorization_redirect, state }: AuthorizationMetadata) => {
  const queryObj = {
    response_type: RESPONSE_TYPE,
    client_id: app_id,
    scope: app_scope,
    redirect_uri: authorization_redirect,
    state: state ? state : getRandomState()
  }
  const query = `?${stringify(queryObj)}`;
  return safeJoin(AUTHORIZATION_URL, query);
}

const TOKEN_PATH = "/api/token/";
const TOKEN_URL = getAccountsURLFromPathname(TOKEN_PATH);

const TOKEN_GRANT_TYPE = "authorization_code";
const REFRESH_GRANT_TYPE = "refresh_token";

export const getTokenFromCode = async ({ code, app_id, app_secret, authorization_redirect }: TokenCreationOptions): Promise<CreatedToken> => {

  const options: RequestOptions = {
    token: getAppAuthorization(app_id, app_secret),
    tokenType: "Basic",
    contentType: "application/x-www-form-urlencoded",
  }
  const form = {
    code,
    redirect_uri: authorization_redirect,
    grant_type: TOKEN_GRANT_TYPE
  }
  const response = await postRequest<CreatedToken>(TOKEN_URL, new URLSearchParams(form), options)
  return response;
}

export const getNewToken = async ({ app_id, app_secret, refresh_token }: TokenRefreshOptions): Promise<RefreshedToken> => {
  const options: RequestOptions = {
    token: getAppAuthorization(app_id, app_secret),
    tokenType: "Basic",
    contentType: "application/x-www-form-urlencoded",
  }
  const form = {
    refresh_token,
    grant_type: REFRESH_GRANT_TYPE
  };

  const response = await postRequest<RefreshedToken>(TOKEN_URL, new URLSearchParams(form), options)
  return response;
}
