import { Request, Response } from "express";

const special = (req: Request, res: Response) => {
  console.log(req);
  return res.json({ msg: `Hey ${req.body.email}!` });
};

export default { special };
