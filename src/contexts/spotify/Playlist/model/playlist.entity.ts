import { Image } from "../../shared/models/image.entity";
import { PaginatedResponse } from "../../shared/models/pagination.entity";
import { TrackEntity } from "../../Track/model/track.entity";

export interface PlaylistEntity {
  collaborative: boolean,
  description: string | null,
  external_url: { spotify: string },
  // Href is set to null because, as per the documentation, it is not supported yet 6/9/2022 10:10pm
  followers: { href: null, total: number },
  href: string,
  id: string,
  images: Image[],
  name: string,
  // todo 6/9/2022 10:11pm
  // owner: UserEntity | { display_name: string }
  public: boolean,
  snapshot_id: string,
  tracks: PaginatedResponse<TrackEntity>,
  type: string,
  url: string
}

export interface PlaylistCreationOptions {
  name: string,
  public?: boolean,
  collaborative?: boolean,
  description?: string
}
export interface PlaylistItemCreationOptions {
  uris: string[],
  position?: number
}