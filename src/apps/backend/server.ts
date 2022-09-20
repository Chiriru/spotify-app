//This belongs outside, maybe in the server.ts file, as it is not required at all in here 

import express from "express";
import helmet from "helmet";
import session from "express-session";
import memstore from "memorystore";
import { mainRouter } from "@backend/router";

const PORT = process.env.PORT || 3535;
const app = express();
const store = memstore(session);

app.use(helmet());
app.use(express.json());
// 3 days
const MAX_AGE = 3 * 24 * 60 * 60 * 1000;
app.use(session({
  secret: process.env.COOKIE_SECRET || "uwu",
  cookie: { httpOnly: true, maxAge: MAX_AGE },
  name: "session_cookie",
  store: new store({
    checkPeriod: MAX_AGE
  })
}));
app.use(mainRouter);

app.listen(3535, () => console.log("Listening @", PORT));