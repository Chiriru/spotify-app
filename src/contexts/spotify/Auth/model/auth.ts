export interface AuthorizationMetadata {
  app_id: string,
  app_scope: string,
  authorization_redirect: string,
  state?: string
}
export interface TokenCreationOptions {
  app_id: string,
  app_secret: string,
  code: string,
  authorization_redirect: string
}
export interface TokenRefreshOptions {
  app_id: string,
  app_secret: string,
  refresh_token: string
}
export interface CreatedToken {
  access_token: string,
  expires_in: string,
  token_type: "Bearer",
  scope: string,
  refresh_token: string
}
export interface RefreshedToken {
  access_token: string,
  expires_in: string,
  token_type: "Bearer",
  scope: string,
  refresh_token?: string
}