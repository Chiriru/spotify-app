import { deleteRequest, getRequest, postRequest } from "../../shared/request"
import { getURLFromPathname, safeJoin } from "../../shared/spotify";
import { getRecommendations } from "../../Track/application/track.useCases";
import { SeedEntity } from "../../Track/model/seed.entity";
import { getUserData } from "../../User/application/user.useCases";
import { UserEntity } from "../../User/model/user.entity";
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
export const getPlaylist = (id: string, token: string) => {

  return getRequest<PlaylistEntity>(PLAYLIST_URL(id), { token });
}
export const createPlaylist = (user_id: string, token: string, options: PlaylistCreationOptions) => {

  return postRequest<PlaylistEntity>(USER_PLAYLIST_CREATION_URL(user_id), options, { token });
}
export const addTracksToPlaylist = (playlist_id: string, token: string, options: PlaylistItemCreationOptions) => {

  return postRequest<{ snapshot_id: string }>(PLAYLISTS_TRACKS_URL(playlist_id), options, { token });
}
export const unfollowPlaylist = (playlist_id: string, token: string) => {
  // This delete request doesnt return anything in particular, so i return true to signify that the unfollow was successful
  return deleteRequest(PLAYLIST_FOLLOWERS_URL(playlist_id), { token })
    .then(_ => true);
}
const DEFAULT_PLAYLIST_NAME = "Your Playlist";
export const createRandomPlaylist = async (user: UserEntity, seed: SeedEntity, token: string, name?: string) => {

  const tracks = await getRecommendations(seed, token);
  const track_uris = tracks.map(track => track.uri);
  console.log("Track URIs:", track_uris);
  console.log("Track names:", tracks.map(track => track.name));

  const playlist = await createPlaylist(user.id, token, { name: name ? name : DEFAULT_PLAYLIST_NAME });
  await addTracksToPlaylist(playlist.id, token, { uris: track_uris });

  return playlist.id;
}
