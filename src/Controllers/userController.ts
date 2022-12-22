import { Request, Response } from "express";
import bcrypt from "bcrypt";

import userModel from "../Models/Users";

export default class userController {
  static register = async (req: Request, res: Response) => {
    let response;
    try {
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const userData = await userModel.create({
        Name: req.body.name,
        Email: req.body.email,
        Password: password,
        Dob: req.body.dob,
        IsAdmin: req.body.isAdmin,
      });
      response = {
        Data: userData,
        Message: "User successfully registered",
        Status: 200,
      };
      return res.status(200).json(response);
    } catch (error: any) {
      response = {
        Data: null,
        Message: error.message,
        Status: 400,
      };
      return res.status(400).json(response);
    }
  };
}
