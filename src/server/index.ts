import express from "express";
import path from "path";

import { htmlRouter } from "./routers/html.ts";
import { sourceRouter } from "./routers/source.ts";

const PORT = 3000;

const app = express();

if (process.env.NODE_ENV === "production") {
  const DIST_PATH = path.join(path.resolve(), "dist");
  app.use("/", express.static(DIST_PATH));
} else {
  const PUBLIC_PATH = path.join(path.resolve(), "public");
  app.use("/", express.static(PUBLIC_PATH));
  app.use("/src", sourceRouter);
}
app.use(htmlRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
