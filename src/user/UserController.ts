import { UserModel, userStructure, IUser } from "../user/model";
import { Get, Post, Controller } from "../../Decorator";
import { validate } from "class-validator";
import { hashSync, compareSync } from "bcrypt";
import { Request, Response } from "express";
const hashSalt:number = 10;

@Controller("/user")
export default class UserController {
  @Get("/")
  public index(req: Request, res: Response) {
    return res.send("User overview");
  }

  @Get("/:name")
  public details(req: Request, res: Response) {
    return res.send(`You are looking at the profile of ${req.params.name}`);
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
              message: "usuario Registrado",
            });
          })
          .catch((rason) => {
            console.log("hubo un error bien cachon");
            console.log(rason);
            return res.json({
              message: "usuario no Registrado",
            });
          });
      } else {
        console.log(errors);
        return res.json({
          message: "datos no validos",
        });
      }
    });
  }
}
