import { Response, Request } from "express";
import { SubmitProverbInput } from "../schemas/submit.schema";
import { submitProverbService } from "../services/submit.service";
import log from "../utils/logger.util";

export async function submitProverbHandler(
  req: Request<{}, {}, SubmitProverbInput>,
  res: Response
) {
  try {
    const submitted = await submitProverbService(req.body);
    if (submitted.postOnTwitter && submitted.twitterHandle !== "") {
      return res
        .status(200)
        .send({ name: submitted.name, handle: submitted.twitterHandle });
    }
    res.sendStatus(200);
  } catch (err) {
    log.debug(`Submit Error: ${err}`);
    res.send("an error occured");
  }
}
