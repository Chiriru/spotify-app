import { ArtistEntity } from "../../Artist/model/artist.entity";

export interface TrackEntity {
  album: any,
  artists: ArtistEntity[],
  available_markets: string[],
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: {
    isrc: string,
    ean: string,
    upc: string
  },
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  is_playable: string,
  linked_from?: TrackEntity,
  restrictions: {
    reason: string
  },
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string,
  is_local: boolean
}
