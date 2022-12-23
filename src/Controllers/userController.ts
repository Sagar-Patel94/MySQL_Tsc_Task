import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../Models/users";
import otpModel from "../Models/forgotPassReq";
import docModel from "../Models/userDocuments";

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

  static login = async (req: Request, res: Response) => {
    let response: any, token: any;
    try {
      await userModel
        .findOne({
          where: {
            Email: req.body.email,
          },
        })
        .then(async (data) => {
          if (req.body.email == "" && req.body.password == "") {
            response = {
              Message: "Please enter email and password",
            };
          } else if (req.body.password == "") {
            response = {
              Message: "Please enter password",
            };
          } else if (req.body.email == "") {
            response = {
              Message: "Please enter email",
            };
          } else if (data) {
            const hashPassword = data.Password;
            await bcrypt
              .compare(req.body.password, hashPassword)
              .then((result) => {
                if (result) {
                  token = jwt.sign(
                    {
                      Id: data.Id,
                      UserId: data.UserId,
                    },
                    "secret",
                    { expiresIn: "23h" }
                  );
                  response = {
                    Message: "Login successfull",
                    Status: 200,
                    Data: data,
                    Token: token,
                  };
                } else {
                  response = {
                    Message: "Password is incorrect",
                  };
                }
              })
              .catch((err) => {
                response = {
                  Message: err.message,
                  Status: 400,
                  Data: null,
                };
                res.status(400).json(response);
              });
          } else {
            response = {
              Message: "Email does not exist",
            };
          }
          res.status(200).json(response);
        })
        .catch((error: any) => {
          response = {
            Message: error.message,
            Status: 400,
            Data: null,
          };
          res.status(400).json(response);
        });
    } catch (err: any) {
      response = {
        Message: err.message,
        Status: 400,
        Data: null,
      };
      res.status(400).json(response);
    }
  };

  static forgotPasswordOTP = async (req: Request, res: Response) => {
    let response;
    try {
      await userModel
        .findOne({
          where: {
            Email: req.body.email,
          },
        })
        .then(async (data) => {
          if (req.body.email === "") {
            response = {
              Message: "Please enter email first",
            };
          } else if (data) {
            const otp = Math.floor(Math.random() * 100000 + 1);
            const otpData = await otpModel.create({
              OTP: otp,
            });
            response = {
              Message: "OTP succefully fetched",
              Status: 200,
              Data: {
                OTP: otpData,
              },
            };
          } else {
            response = {
              Message: "Email not found",
            };
          }
          res.status(200).json(response);
        })
        .catch((err) => {
          response = {
            Message: err.message,
            Status: 400,
            Data: null,
          };
          res.status(400).json(response);
        });
    } catch (error: any) {
      response = {
        Message: error.message,
        Status: 400,
        Data: null,
      };
      res.status(400).json(response);
    }
  };

  static allUsers = async (req: Request, res: Response) => {
    let response;
    try {
      let isAdmin: any = res.locals;
      if (isAdmin === true) {
        let allUsers = await userModel.findAll();
        response = {
          Message: "Users successfully fetched",
          Status: 200,
          Data: allUsers,
        };
      } else {
        response = {
          Message: "You are not authorized user",
        };
      }
      res.status(200).json(response);
    } catch (error: any) {
      response = {
        Message: error.message,
        Status: 400,
        Data: null,
      };
      res.status(400).json(response);
    }
  };

  static createDoc = async (req: Request, res: Response) => {
    let response;
    try {
      const userData = await userModel.findOne({
        where: { UserId: req.params.userId },
      });
      if (userData?.dataValues) {
        const documents = await docModel.create({
          UserId: req.params.userId,
          Name: userData.Name,
        });
        response = {
          Message: "Document successfully created",
          Status: 200,
          Data: documents,
        };
      } else {
        response = {
          Message: "Invalid UserId",
        };
      }
      res.status(200).json(response);
    } catch (error: any) {
      res.status(200).json({ Error: error.message });
    }
  };
}
