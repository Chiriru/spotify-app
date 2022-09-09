import { Router } from "express";
import { useController } from "../../shared/infrastructure/controller";
import { validateSearchTypes, getSearchResults } from "../application/search.useCases";
import { Controller, createResponse } from "../../shared/models/controller";

const search: Controller = async (req) => {

  const { q: query, type } = req.query;

  if (!query) return createResponse(400, "Missing 'q' query");
  if (!type) return createResponse(400, "Missing 'type' query");

  const types = type.split(",");
  if (!validateSearchTypes(types)) return createResponse(400, "Invalid 'type' query. 'type' should be a comma separated list of options. Available options: 'artist', 'track', 'playlist'");
  
  const { token } = req;
  console.log(token, query, types);

  const results = await getSearchResults({ q: query, type: types }, token);
  return createResponse(200, "", results);
}

export const router = Router();
router.get("/", useController(search));
