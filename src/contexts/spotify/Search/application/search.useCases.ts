import { getRequest } from "@spotify/shared/request";
import { getURLFromPathname } from "@spotify/shared/spotify";
import { SearchEntity, SearchOptions, SearchType } from "../model/search.entity";

const SEARCH_API_PATHNAME = "/search/";

const SEARCH_API_URL = getURLFromPathname(SEARCH_API_PATHNAME);

// i hate this so much
export const validateSearchTypes = (maybeTypes: string[]): maybeTypes is SearchType[] => {
  return maybeTypes.every(maybeType => maybeType === "artist" || maybeType === "track" || maybeType === "playlist");
};
const searchOptionsToParams = (options: SearchOptions) => {
  const entries = Object.entries(options);
  const convertedEntries = entries.map(([key, val]) => [key, Array.isArray(val) ? val.join(",") : val.toString()]);
  return Object.fromEntries(convertedEntries) as Record<string, string>;
}
export const getSearchResults = (options: SearchOptions, token: string) => {

  return getRequest<SearchEntity>(SEARCH_API_URL, { token, params: searchOptionsToParams(options) })
}
