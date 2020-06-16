import {
  IPet,
  PetsSchema,
  PetModel,
  petStructure,
  TokenDecode,
} from "../model";
import { ErrorResponse, SuccessResponse } from "../../../config";
import { Get, Post, Controller } from "../../../Decorator";
import { hashSync, compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { validate } from "class-validator";
import { mongo } from "mongoose";
import mongoose from "../../../config/mongo";

@Controller("/pets")
export default class PetController {
  @Post("/create")
  public createPet(req: Request, res: Response) {
    let data: petStructure = new petStructure(req.body);
    if (req.headers.authorization) {
      let token: string = req.headers.authorization.replace("Bearer ", "");
      try {
        const { userId } = verify(
          token,
          process.env.SECRET_TOKEN
        ) as TokenDecode;

        let image: string = "";
        if (data.type === `cat`) {
          image = `https://placekitten.com/g/300/300`;
        } else if (data.type === `dog`) {
          image = `https://images.unsplash.com/photo-1529927066849-79b791a69825`;
        }
        data = {
          ...data,
          ...{
            owner: mongoose.Types.ObjectId(userId),
            image,
            found:false
          },
        };
        validate(data).then((errors) => {
          if (errors.length <= 0) {
            let pet: IPet = new PetModel(data);
            pet
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
                  message: "Error conexion con mongo",
                  userRegistered: false,
                });
              });
          } else {
            console.log(errors);
            return res.json({
              message: errors,
              userRegistered: false,
            });
          }
        });
      } catch (error) {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "INVALID_TOKEN" }));
      }
    }else {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "TOKEN_IS_NECESARY" }));
      }
  }
  @Get("/list")
   public async listPets(req: Request, res: Response) {
    if (req.headers.authorization) {
        return res.json({
            error:false,
            data: await PetModel.find({})
        }
        )
    }else {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "TOKEN_IS_NECESARY" }));
      }
  }
  @Get("/list/:found")
  public async listFoundNoFound(req: Request, res: Response) {
   if (req.headers.authorization) {
       if(req.params.found==="true"){
        return res.json({
            error:false,
            data: await PetModel.find({found:true})
        }
        )}else{
            return res.json({
                error:false,
                data: await PetModel.find({found:false})
            }
            )
        }
   }else {
       return res
         .status(200)
         .json(new ErrorResponse({ message: "TOKEN_IS_NECESARY" }));
     }
 }
  @Get("/listme")
   public async listPetsOwner(req: Request, res: Response) {
    if (req.headers.authorization) {
        let token: string = req.headers.authorization.replace("Bearer ", "");
      try {
        const { userId } = verify(
          token,
          process.env.SECRET_TOKEN
        ) as TokenDecode;

        return res.json({
            error:false,
            data: await PetModel.find({owner:userId})
        }
        )}catch (error) {
            return res
              .status(200)
              .json(new ErrorResponse({ message: "INVALID_TOKEN" }));
          }
    }else {
        return res
          .status(200)
          .json(new ErrorResponse({ message: "TOKEN_IS_NECESARY" }));
      }
  }
}
