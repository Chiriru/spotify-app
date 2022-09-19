import join from "url-join";

export const SPOTIFY_API_URL = "https://api.spotify.com/";
export const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/";
export const API_VERSION = "v1";
export const getURLFromPathname = (pathname: string) => new URL(join(API_VERSION, pathname), SPOTIFY_API_URL).href;
export const getAccountsURLFromPathname = (pathname: string) => new URL(pathname, SPOTIFY_ACCOUNTS_URL).href;
export const safeJoin = (...paths: string[]) => new URL(join(...paths)).href;

