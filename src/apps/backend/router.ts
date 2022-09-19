import { Router } from "express";
import { router as search } from "../../contexts/spotify/Search/infrastructure/search.controller";
import { router as playlist } from "../../contexts/spotify/Playlist/infrastructure/playlist.controller";
import { auth } from "./routes/auth.route";

export const mainRouter = Router();

mainRouter.use("/auth", auth);
mainRouter.use("/search", search as Router);
mainRouter.use("/playlist", playlist as Router);