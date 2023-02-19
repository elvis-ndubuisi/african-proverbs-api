import { Request, Response } from "express";
import {
  CreateNewProverbInput,
  CreateProverbsInput,
  ProverbFilterQueryInput,
  ProverbIdQueryInput,
} from "../schemas/proverb.schema";
import {
  createNewProverbService,
  deleteProverbService,
  editProverbService,
  getProverbService,
} from "../services/proverbs.service";
import lodash from "lodash";
import { privateFields } from "../models/proverb.model";

/**
 * Get a random proverb.
 * @returns A proverb object
 */
export async function getProverbHandler(_: Request, res: Response) {
  try {
    const proverb = await getProverbService({});
    res.status(200).send(lodash.omit(proverb[0], privateFields));
  } catch (err: any) {
    return res.status(500).send(err);
  }
}

/**
 * Get a random proverb whos country field matches request params.
 * @returns A proverb object.
 */
export async function filterProverbHandler(
  req: Request<{}, {}, {}, ProverbFilterQueryInput>,
  res: Response
) {
  try {
    const proverb = await getProverbService({ filter: req.query.filter });
    res.status(200).send(lodash.omit(proverb[0], privateFields));
  } catch (err: any) {
    res.status(500).send(err);
  }
}

/**
 * Get a single proverb object from cached memory.
 * @param req
 * @param res
 * @returns A proverb object.
 */
export async function todayProverbHandler(req: Request, res: Response) {
  res.send("proverb today");
}

// Admins only
export async function createNewProverbHandler(
  req: Request<{}, {}, CreateNewProverbInput>,
  res: Response
) {
  try {
    if (!res.locals.admin) {
      return res.send("Some section you would never see. HAHAHAHAH");
    }

    const proverb = await createNewProverbService(
      req.body,
      res.locals.admin._id
    );
    res.status(200).json(lodash.omit(proverb.toJSON(), privateFields));
  } catch (err: any) {
    res.status(500).send(err);
  }
}

export async function createProverbsHandler(
  req: Request<{}, {}, CreateProverbsInput>,
  res: Response
) {
  res.send("post new probs");
}

export async function deleteProverbHandler(
  req: Request<{}, {}, {}, ProverbIdQueryInput>,
  res: Response
) {
  try {
    const proverb = await deleteProverbService({
      authorId: res.locals.admin._id,
      proverbId: req.query.proverbId,
    });
    if (!proverb) {
      return res
        .status(404)
        .send(`Proverb with ID:${req.query.proverbId} isnt' found`);
    }
    res
      .status(200)
      .send(`Proverb with id: #${req.query.proverbId} was deleted.`);
  } catch (err: any) {
    return res
      .status(500)
      .send(`Couldn't delete proverb with id: #${req.query.proverbId}`);
  }
}

export async function editProverbHandler(
  req: Request<{}, {}, CreateNewProverbInput, ProverbIdQueryInput>,
  res: Response
) {
  try {
    const proverb = await editProverbService({
      proverbId: req.query.proverbId,
      payload: req.body,
    });
    res.send(`Proverb #ID: ${proverb?.id} was updated`);
  } catch (err: any) {
    res.send("Couldn't update proverb");
  }
}
