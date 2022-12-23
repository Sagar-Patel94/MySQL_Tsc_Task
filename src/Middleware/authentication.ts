import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import userModel from "../Models/users";

export default class authentication {
  static authentication = (req: Request, res: Response, next: NextFunction) => {
    let response;
    try {
      let authorizationToken: any = req.get("authorization");
      if (authorizationToken == undefined) {
        response = {
          Message: "Token not found",
        };
        res.status(200).json(response);
      } else {
        let token: string = authorizationToken.split(" ")[1];
        jwt.verify(token, "secret", async function (err, decoded) {
          if (decoded) {
            let decode: any = jwt.decode(token);
            let userData: any = await userModel.findByPk(decode.Id);
            res.locals = userData.dataValues.IsAdmin;
            next();
          } else {
            response = {
              Message: "Invalid or expired token!!!",
            };
            res.status(200).json(response);
          }
        });
      }
    } catch (error: any) {
      response = {
        Message: error.message,
        Status: 400,
        Data: null,
      };
      res.status(400).json(response);
    }
  };
}
