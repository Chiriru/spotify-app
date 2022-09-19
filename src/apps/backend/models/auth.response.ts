import { SpotifySession } from "../../../contexts/spotify/shared/models/session";

export interface LoggedInResponse {
  loggedIn: true,
  validToken: boolean,
  authorization_url: string,
  profile: SpotifySession
}
export interface LoggedOutResponse {
  loggedIn: false,
  authorization_url: string
}
