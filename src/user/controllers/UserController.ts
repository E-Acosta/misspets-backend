import { UserModel, userStructure, IUser, TokenDecode } from "../model";
import { ErrorResponse, SuccessResponse } from "../../../config";
import { Get, Post, Controller } from "../../../Decorator";
import { hashSync, compareSync } from "bcrypt";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { sign, verify } from "jsonwebtoken";

const hashSalt: number = 10;

@Controller("/user")
export default class UserController {
  @Get("/:name")
  public async details(req: Request, res: Response) {
    console.log(req.headers)
    if (req.params.name === "me" && req.headers.authorization) {
      let token: string = req.headers.authorization.replace("Bearer ", "");
      try {
        const { userId } = verify(
          token,
          process.env.SECRET_TOKEN
        ) as TokenDecode;
        const userInfo: IUser = await UserModel.findOne({ _id: userId });
        console.log(userInfo);
        return res.json(
          new SuccessResponse({
            email: userInfo.email,
            lastname: userInfo.lastname,
            name: userInfo.name,
          })
        );
      } catch (error) {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "INVALID_TOKEN" }));
      }
    } else {
      return res
        .status(200)
        .json(new ErrorResponse({ message: "TOKEN_IS_NECESARY" }));
    }
  }
  @Post("/create")
  public createUser(req: Request, res: Response) {
    let data: userStructure = new userStructure(req.body);
    validate(data).then((errors) => {
      if (errors.length <= 0) {
        data = {
          ...data,
          ...{
            password: hashSync(data.password, hashSalt),
          },
        };
        let user: IUser = new UserModel(data);
        user
          .save()
          .then(() => {
            return res.json({
              userRegistered: true,
            });
          })
          .catch((rason) => {
            console.log("hubo un error bien cachon");
            console.log(rason);
            return res.json({
              message:"Error conexion con mongo",
              userRegistered: false,
            });
          });
      } else {
        console.log(errors);
        return res.json({
          message:errors[0].constraints.isEmail,
          userRegistered: false
        });
      }
    });
  }
  @Post("/login")
  public async login(req: Request, res: Response) {
    const email: string = req.body.email;
    const password: string = req.body.password;
    console.log(req.body)
    let user: IUser = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json(new ErrorResponse({ message: "EMAIL NOT EXITS" }));
    } else {
      if (compareSync(password, user.password)) {
        return res.json(
          new SuccessResponse({
            token: sign({ userId: user._id }, process.env.SECRET_TOKEN),
          })
        );
      } else {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "INVALID PASSWORD" }));
      }
    }
  }
}
