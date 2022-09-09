import { Router } from "express";
import { router as search } from "../../contexts/spotify/Search/infrastructure/search.controller";
import { router as playlist } from "../../contexts/spotify/Playlist/infrastructure/playlist.controller";

export const mainRouter = Router();

mainRouter.use("/search", search);
mainRouter.use("/playlist", playlist);