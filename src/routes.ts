import { Express, Request, Response } from "express";
import { getProverb } from "./controllers/proverbs.controller";

function routes(app: Express) {
  app.get("/sss", (req, res) => {
    res.send("hellow");
  });
}

export default routes;
