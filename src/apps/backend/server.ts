//This belongs outside, maybe in the server.ts file, as it is not required at all in here 

import express from "express";
import helmet from "helmet";
import { mainRouter } from "./router";

const PORT = process.env.PORT || 3535;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(mainRouter);

app.listen(3535, () => console.log("Listening @", PORT));