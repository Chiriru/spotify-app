import { getURLFromPathname, safeJoin } from "../../shared/spotify"
import { getRequest } from "../../shared/request";
import { TrackEntity } from "../model/track.entity";
import { SeedEntity } from "../model/seed.entity";
import { stringify } from "query-string";

const TRACK_PATHNAME = "/tracks/";
const TRACK_RECOMMENDATIONS_PATHNAME = "/recommendations"

const TRACK_API_URL = getURLFromPathname(TRACK_PATHNAME);
const RECOMMENDATIONS_API_URL = getURLFromPathname(TRACK_RECOMMENDATIONS_PATHNAME);

const TRACK_URL = (id: string) => safeJoin(TRACK_API_URL, id);
const TRACK_RECOMMENDATIONS_URL = (query: SeedEntity) => safeJoin(RECOMMENDATIONS_API_URL, `?${stringify(query)}`);

export const getTrack = (id: string, token: string) => {

  return getRequest<TrackEntity>(TRACK_URL(id), { token });
}
export const getRecommendations = async (seed: SeedEntity, token: string) => {
  const data = await getRequest<{ tracks: TrackEntity[]; }>(TRACK_RECOMMENDATIONS_URL(seed), { token });
  return data.tracks;
}

// const seed: SeedEntity = {
//   "seed_artists": "6mEQK9m2krja6X1cfsAjfl",
// }
// const token = "BQBZ3ALF3VEC4YqHdvgfAeDdpKP2emlX24TWyBVB9_SkjkNkqcK6-hKJC-gCc44-pEO8c6IaBMK-AatKevlRSi5W3BryWv-WECdnUgcTbHkp-cKWT7WaBamI17TUwrtOJZ2VWwXXHyaDAThTCYe7Awj8r_6XrTw3XNFakyMlN-Sw3VR8aa8mvmL8QEUGNrFa3CTfrpq_DYFptxE6c6fU3q2uU_-KEw5gzB48PaDilP1VHaSZKKRNp5W-kcy9aS5aylRwqIsFzCovekFnBZq_POdYp2Mz";

// console.log(TRACK_RECOMMENDATIONS_URL(seed));
// getRecommendations(seed, token)
//   .then(response => console.log(response.map(track => track.name)))
//   .catch(err => console.log("Error:", err));