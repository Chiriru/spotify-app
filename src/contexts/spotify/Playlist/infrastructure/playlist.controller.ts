import { Router } from "express";
import { useController } from "@spotify/shared/infrastructure/controller";
import { Controller, createResponse } from "../../shared/models/controller";
import { SeedEntity } from "@spotify/Track/model/seed.entity";
import { getUserData } from "@spotify/User/application/user.useCases";
import { createRandomPlaylist } from "../application/playlist.useCases";

const createPlaylistFromSeed: Controller = async (req) => {

  console.log(req.body);
  if (!req.body) return createResponse(400, "Missing body");

  const { name, seed } = req.body as { name: string, seed: SeedEntity };
  if (!name) return createResponse(400, "Missing 'name' property in body");
  if (!seed || (!seed.seed_artists && !seed.seed_genres && ! seed.seed_tracks)) return createResponse(400, "Missing seeds in body");

  const { access_token: token } = req.session;

  const user = await getUserData(token);

  const playlist_id = await createRandomPlaylist(user, seed, token, name);

  // todo add created_playlist id 8/9/2022 2:29am
  return createResponse(200, "Created", { playlist_id });
}

export const router = Router();
router.post("/generate", useController(createPlaylistFromSeed));