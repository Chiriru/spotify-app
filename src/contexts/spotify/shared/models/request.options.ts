type TOKEN_PREFIXES = "Bearer" | "Basic";

export interface RequestOptions {
  token?: string,
  tokenType?: TOKEN_PREFIXES,
  params?: Record<string, string>,
  contentType?: string
}
