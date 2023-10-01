import { Router } from "express";
import path from "path";
import fs from "fs/promises";

export const htmlRouter = Router();

const indexHTML = path.resolve("./src/server/views/index.html.ejs");

const ENVIRONMENT = process.env.NODE_ENV;

let CACHED_MANIFEST: any;

const parseManifest = async () => {
  if (ENVIRONMENT !== "production") {
    return {};
  } else if (CACHED_MANIFEST === undefined) {
    const manifestPath = path.resolve("./dist/manifest.json");
    const manifestContents = await fs.readFile(manifestPath, {
      encoding: "utf-8",
    });
    const manifestJSON = JSON.parse(manifestContents);
    CACHED_MANIFEST = manifestJSON;
  }

  return CACHED_MANIFEST;
};

htmlRouter.get("/*", async (_req, res) => {
  const MANIFEST = await parseManifest();
  const ctx = { ENVIRONMENT, MANIFEST };
  res.render(indexHTML, ctx);
});
