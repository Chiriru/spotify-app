import { Image } from "../../shared/models/image.entity"

export interface ArtistEntity {
  id: string,
  name: string,
  genres: string[],
  images: Image[],
  popularity: number,
  followers: {
    href: null,
    total: number
  },
  external_url: {
    spotify: string
  },
  href: string,
  type: string,
  uri: string
}