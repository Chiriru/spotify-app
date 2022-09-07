import { ArtistEntity } from "../../Artist/model/artist.entity";
import { Image } from "../../shared/models/image.entity"
import { TrackEntity } from "../../Track/model/track.entity";

type AlbumType = "album" | "single" | "compilation"
type ReleaseDatePrecision = "year" | "month" | "day";

export interface AlbumEntity {
  id: string,
  name: string
  images: Image[],
  album_type: AlbumType,
  total_tracks: number,
  available_market: string[],
  external_url: { spotify: string },
  href: string,
  release_date: string,
  release_date_precision: ReleaseDatePrecision,
  type: "album",
  restrictions?: { reason: string }
  uri: string,
  artists?: ArtistEntity[],
  tracks?: TrackEntity[]
}