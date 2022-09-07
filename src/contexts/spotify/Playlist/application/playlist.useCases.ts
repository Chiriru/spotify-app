import { deleteRequest, getRequest, postRequest } from "../../shared/request"
import { getURLFromPathname, safeJoin } from "../../shared/spotify";
import { PlaylistCreationOptions, PlaylistEntity, PlaylistItemCreationOptions } from "../model/playlist.entity";

const PLAYLISTS_PATHNAME = "/playlists/";
const PLAYLISTS_TRACKS_PATHNAME = "/tracks/";
const PLAYLISTS_FOLLOWERS_PATHNAME = "/followers";
const USER_API_PATH = "/users/"

const PLAYLISTS_API_URL = getURLFromPathname(PLAYLISTS_PATHNAME);
const USER_URL = getURLFromPathname(USER_API_PATH);

const PLAYLIST_URL = (id: string) => safeJoin(PLAYLISTS_API_URL, id);
const PLAYLISTS_TRACKS_URL = (id: string) => safeJoin(PLAYLISTS_API_URL, id, PLAYLISTS_TRACKS_PATHNAME);
const USER_PLAYLIST_CREATION_URL = (id: string) => safeJoin(USER_URL, id, PLAYLISTS_PATHNAME);
const PLAYLIST_FOLLOWERS_URL = (id: string) => safeJoin(PLAYLISTS_API_URL, id, PLAYLISTS_FOLLOWERS_PATHNAME);

// TODO add "additional_types", (filter) "fields" and "market" queries support
const getPlaylist = (id: string, token: string) => {

  return getRequest<PlaylistEntity>(PLAYLIST_URL(id), { token });
}

const createPlaylist = (user_id: string, token: string, options: PlaylistCreationOptions) => {

  return postRequest<PlaylistEntity>(USER_PLAYLIST_CREATION_URL(user_id), options, { token });
}
const addTrackToPlaylist = (playlist_id: string, token: string, options: PlaylistItemCreationOptions) => {

  return postRequest<{ snapshot_id: string }>(PLAYLISTS_TRACKS_URL(playlist_id), options, { token });
}
const unfollowPlaylist = (playlist_id: string, token: string) => {
  // This delete request doesnt return anything in particular, so i return true to signify that the unfollow was successful
  return deleteRequest(PLAYLIST_FOLLOWERS_URL(playlist_id), { token })
    .then(_ => true);
}