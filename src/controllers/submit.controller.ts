import { Response, Request } from "express";
import {
  SubmitProverbIdInput,
  SubmitProverbInput,
} from "../schemas/submit.schema";
import {
  approveSubmittedProverbService,
  disapprovedSubmittedProverbService,
  getSubmittedProverbsService,
  submitProverbService,
} from "../services/submit.service";
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
        .json({ name: submitted.name, handle: submitted.twitterHandle });
    }
    res.sendStatus(200);
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).send("proverb already exists");
    }
    res.status(500).send("Internal server error");
  }
}

export async function getSubmittedProverbsHandler(req: Request, res: Response) {
  try {
    const proverbs = await getSubmittedProverbsService();
    res.send(proverbs);
  } catch (err: any) {
    res.status(500).send("Internal server error");
  }
}

export async function approveSubmittedProverbHandler(
  req: Request<SubmitProverbIdInput, {}, {}>,
  res: Response
) {
  try {
    const submitted = await approveSubmittedProverbService({
      submitId: req.params.submitId,
      authorId: res.locals.admin._id,
    });
    if (!submitted)
      return res.status(404).send("couldn't approve submitted payload"); // Unable to approved submit.
    res.status(200).send("Proverb approved");
  } catch (err: any) {
    res.status(500).send("Proverb not approved");
  }
}

export async function disapprovedSubmittedProverbHandler(
  req: Request<SubmitProverbIdInput, {}, {}>,
  res: Response
) {
  try {
    // Check admin role.
    if (res.locals.admin.role !== "master") {
      return res.sendStatus(401);
    }
    await disapprovedSubmittedProverbService(req.params.submitId);
    res.send("Proverb removed");
  } catch (err: any) {
    log.error(err);
    res.status(500).send("Couldn't delete specified proverb");
  }
}
