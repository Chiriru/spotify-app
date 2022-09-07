import { PaginatedResponse } from "../../shared/models/pagination.entity";
import { getURLFromPathname, safeJoin } from "../../shared/spotify";
import { getRequest } from "../../shared/request";

import { AlbumEntity } from "../../Album/model/album.entity";
import { ArtistEntity } from "../model/artist.entity";
import { TrackEntity } from "../../Track/model/track.entity";

const ARTISTS_PATHNAME = "/artists/";
const ALBUM_PATHNAME = "/albums/";
const TOP_TRACKS_PATHNAME = "/top-tracks/";
const RELATED_PATHNAME = "/related-artists/";
const ARTISTS_API_URL = getURLFromPathname(ARTISTS_PATHNAME);

const ARTIST_URL = (id: string) => safeJoin(ARTISTS_API_URL, id);
const ARTIST_ALBUM_URL = (id: string) => safeJoin(ARTISTS_API_URL, id, ALBUM_PATHNAME);
const ARTIST_TOP_TRACKS_URL = (id: string) => safeJoin(ARTISTS_API_URL, id, TOP_TRACKS_PATHNAME);
const ARTIST_RELATED_URL = (id: string) => safeJoin(ARTISTS_API_URL, id, RELATED_PATHNAME)

export const getArtist = (token: string, id: string) => {

  return getRequest<ArtistEntity>(ARTIST_URL(id), { token });
}

export const getArtistAlbums = (token: string, id: string) => {

  return getRequest<PaginatedResponse<AlbumEntity>>(ARTIST_ALBUM_URL(id), { token });
}

// TODO constraint to country codes maybe
export const getArtistTopTracks = async (token: string, id: string, country: string) => {
  const query = {
    market: country
  };

  const data = await getRequest<{ tracks: TrackEntity[]; }>(ARTIST_TOP_TRACKS_URL(id), { token, params: query });
  return data.tracks;
}

export const getRelatedArtists = async (token: string, id: string) => {

  const data = await getRequest<{ artists: ArtistEntity[]; }>(ARTIST_RELATED_URL(id), { token });
  return data.artists;
}

// console.log(ARTIST_TOP_TRACKS_URL("6mEQK9m2krja6X1cfsAjfl"))
// const token = "BQBZ3ALF3VEC4YqHdvgfAeDdpKP2emlX24TWyBVB9_SkjkNkqcK6-hKJC-gCc44-pEO8c6IaBMK-AatKevlRSi5W3BryWv-WECdnUgcTbHkp-cKWT7WaBamI17TUwrtOJZ2VWwXXHyaDAThTCYe7Awj8r_6XrTw3XNFakyMlN-Sw3VR8aa8mvmL8QEUGNrFa3CTfrpq_DYFptxE6c6fU3q2uU_-KEw5gzB48PaDilP1VHaSZKKRNp5W-kcy9aS5aylRwqIsFzCovekFnBZq_POdYp2Mz";
// getRelatedArtists(token, "6mEQK9m2krja6X1cfsAjfl").then((response) => {
//   console.log(response.map(artist => artist.id));
// }).catch(err => console.log(err));