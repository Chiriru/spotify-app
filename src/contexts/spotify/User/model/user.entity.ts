import { Image } from "../../shared/models/image.entity";

export interface UserEntity {
  country: string,
  display_name: string,
  email: string,
  explicit_content: { filter_enabled: boolean, filter_locked: boolean },
  external_urls: { spotify: string },
  followers: { href: null, total: number },
  href: string,
  id: string,
  images: Image[],
  product: string,
  type: string,
  url: string
}