import { getRequest, postRequest } from "../../shared/request"
import { getAccountsURLFromPathname, getURLFromPathname } from "../../shared/spotify";
import { UserEntity, RefreshedToken, CreatedToken, AuthorizationMetadata, TokenCreationOptions, TokenRefreshOptions } from "../model/user.entity";

const USER_PATHNAME = "/me/";

const USER_URL = getURLFromPathname(USER_PATHNAME);

export const getUserData = (token: string) => {
  return getRequest<UserEntity>(USER_URL, { token });
}


// Authorization
import { stringify } from "query-string";
import { safeJoin } from "../../shared/spotify";
import { randomBytes } from "crypto";
import { RequestOptions } from "../../shared/models/request.options";

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

// console.log(getAuthorizationURL({ app_id: "1ae88614f2e34afdace9b8adb7239bdc", app_scope: "user-read-recently-played user-follow-read user-follow-modify playlist-read-private playlist-modify-public playlist-read-collaborative user-read-email user-read-private user-library-modify user-library-read", authorization_redirect: "https://www.iwi.com", state: "uwu" }));
// const options: TokenCreationOptions = {
//   code: "AQDxtQbG4PNLhBNYpmK6m_DS_ReV4P3Ei6Q-_YQsmiLcZGk8b2fpnZf2CNoW-nCDwKt2CsYUaxzRW_bVGbm4Ldsbev4pjh-AuVzyZjcVfWH5hkaFC6cX946dVXzQrzjCETaaambDQEz1rbkyfl9IbMqK3xGosY5qw0kgjr9zXlg7SqORZLHKGH-F6J0EuD53AcXXgHi1JlAySE7WNsTZL9du7kvTZRh7p4Psk8c_H54ji320qCvWZiJQBuZDQD-XfC-B9kpqPTzsKHckqyhAsWHPBf8dFsOzLOm0MWgYmAeFKVB2_hP-TPOyugJbVm0_IUrCUX9ydGqmJr1D_RMevwP9o5U7JL_y9zWKhzsnhHHrLIC-laiA28jeVfQ1nPbvVq9rdMQVJQZyPaZIgvmki7jdBl_uJ12nrJFx5FJBuYOszkG4Rtu7pQTvHV-QitBW",
//   app_id: "1ae88614f2e34afdace9b8adb7239bdc",
//   app_secret: "f90fc84350774709853c6d12425b6b4b",
//   authorization_redirect: "https://www.iwi.com",
// }
// getTokenFromCode(options)
//   .then(console.log)
//   .catch(console.log);