import { getURLFromPathname, safeJoin } from "@spotify/shared/spotify"
import { getRequest } from "@spotify/shared/request";
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
