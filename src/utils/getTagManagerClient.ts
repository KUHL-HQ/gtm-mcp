import { google } from "googleapis";
import { GoogleAuth } from "google-auth-library";
import { log } from "./log.js";

type TagManagerClient = ReturnType<typeof google.tagmanager>;

let cachedAuth: GoogleAuth | null = null;

function getAuth(): GoogleAuth {
  if (!cachedAuth) {
    cachedAuth = new GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/tagmanager.edit.containers",
        "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
        "https://www.googleapis.com/auth/tagmanager.manage.accounts",
        "https://www.googleapis.com/auth/tagmanager.manage.users",
        "https://www.googleapis.com/auth/tagmanager.publish",
        "https://www.googleapis.com/auth/tagmanager.readonly",
        "https://www.googleapis.com/auth/tagmanager.delete.containers",
      ],
    });
  }
  return cachedAuth;
}

export async function getTagManagerClient(): Promise<TagManagerClient> {
  try {
    const auth = getAuth();
    return google.tagmanager({
      version: "v2",
      auth: auth as any,
    });
  } catch (error) {
    log("Error creating Tag Manager client:", error);
    throw error;
  }
}
