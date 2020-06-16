import {
  validate,
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsOptional,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { IPet } from "../interfaces";
import mongoose from "../../../../config/mongo";
export class petStructure {
  @IsMongoId()
  @IsNotEmpty()
  owner: mongoose.Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  type: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsDateString()
  @IsNotEmpty()
  date: String;
  @IsString()
  @IsOptional()
  description: string;
  @IsBoolean()
  found: boolean;
  @IsString()
  @IsOptional()
  image: string;

  constructor(data: IPet) {
    this.owner= data.owner;
    this.name= data.name;
    this.type= data.type;
    this.address= data.address;
    this.phone= data.phone;
    this.date=data.date;
    this.description= data.description;
    this.found=data.found;
    this.image=data.image;
  }
}
