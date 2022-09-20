import { Router } from "express";
import { useController } from "@spotify/shared/infrastructure/controller";
import { Controller, createResponse } from "@spotify/shared/models/controller";
import { validateSearchTypes, getSearchResults } from "../application/search.useCases";

const search: Controller = async (req) => {

  const { q: query, type } = req.query;

  if (!query) return createResponse(400, "Missing 'q' query");
  if (!type) return createResponse(400, "Missing 'type' query");

  const types = type.split(",");
  if (!validateSearchTypes(types)) return createResponse(400, "Invalid 'type' query. 'type' should be a comma separated list of options. Available options: 'artist', 'track', 'playlist'");
  
  const { access_token: token } = req.session;
  console.log(token, query, types);

  const results = await getSearchResults({ q: query, type: types }, token);
  return createResponse(200, "", results);
}

export const router = Router();
router.get("/", useController(search));
