
export interface SeedEntity {
  seed_artists?: string,
  seed_genres?: string,
  seed_tracks?: string,
  limit?: number,
  market?: string,

  /** TODO add extra seed properties, like max_duration, max_instrumentalness, max_loudness, etc */
}