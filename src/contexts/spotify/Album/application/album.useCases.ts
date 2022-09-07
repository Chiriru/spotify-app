import { getURLFromPathname, safeJoin } from "../../shared/spotify"
import { AlbumEntity } from "../model/album.entity"
import { getRequest } from "../../shared/request";

// I made this because i mistook "albums" with "playlists".... now its useles.... im still gonna keep it tho


const ALBUMS_PATHNAME = "/albums/";
const USER_PATHNAME = "/me/";
const USER_API_URL = getURLFromPathname(USER_PATHNAME);
const ALBUMS_API_URL = getURLFromPathname(ALBUMS_PATHNAME);

const ALBUM_URL = (id: string) => safeJoin(ALBUMS_API_URL, id);
const SAVE_ALBUM_URL = () => safeJoin(USER_API_URL, ALBUMS_PATHNAME)

export const getAlbum = (id: string, token: string) => {

  return getRequest<AlbumEntity>(ALBUM_URL(id), { token });
}
export const saveAlbum = (ids: string[] | string, token: string) => {
  
}
