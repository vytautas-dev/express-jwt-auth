import { Request, Response } from "express";
import { IUser } from "../types/types";

const special = (req: Request, res: Response) => {
  const id = req?.user?._id;

  return res.json({ msg: `Hey user id: ${id}` });
};

export default { special };
