import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "./.env") });

const APP_ID = process.env.APP_ID || "";
const APP_SECRET = process.env.APP_SECRET || "";
const APP_SCOPE = process.env.APP_SCOPES || "";
const APP_REDIRECT_URI = process.env.REDIRECT_URI || "";

export const APP_ENV = {
  app_id: APP_ID,
  app_secret: APP_SECRET,
  app_scope: APP_SCOPE,
  authorization_redirect: APP_REDIRECT_URI,
}