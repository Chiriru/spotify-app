//This belongs outside, maybe in the server.ts file, as it is not required at all in here 

import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.get("/", (req, res) => res.send("Hello World"));

app.listen(8080, () => console.log("Listening"));