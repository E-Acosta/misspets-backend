import { validate,IsNotEmpty, IsString, IsMongoId, IsOptional, IsEmail, isNotEmpty } from 'class-validator';
import {IUser} from '../interfaces';
export class userStructure {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    password: string

    constructor(data:IUser){
        this.email=data.email
        this.lastname=data.lastname
        this.name=data.name
        this.password=data.password
    }

}