import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

const special = (req: Request, res: Response) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";
  const decoded: { id: string } = jwt_decode(token);

  return res.json({ msg: `Hey user id: ${decoded.id}!` });
};

export default { special };
