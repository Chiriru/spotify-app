import { ArtistEntity } from "../../Artist/model/artist.entity";
import { PlaylistEntity } from "../../Playlist/model/playlist.entity";
import { PaginatedResponse } from "../../shared/models/pagination.entity";
import { TrackEntity } from "../../Track/model/track.entity";

export type SearchType = "artist" | "playlist" | "track";
export type SearchOptions = {
  q: string,
  type: SearchType[],
  include_external?: "audio",
  market?: string,
  limit?: number,
  offset?: number
}
export interface SearchEntity {
  tracks?: PaginatedResponse<TrackEntity>,
  artists?: PaginatedResponse<ArtistEntity>,
  // TODO add albums
  // album?: PaginatedResponse<AlbumEntity>,
  playlists?: PaginatedResponse<PlaylistEntity>,
  // TODO add shows
  // shows?: PaginatedResponse<ShowEntity>,
  //TODO add episodes
  // episodes: PaginatedResponse<EpisodeEntity>
}