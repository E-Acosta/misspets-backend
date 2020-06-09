import { validate,IsNotEmpty, IsString, IsMongoId, IsOptional, IsEmail, isNotEmpty } from 'class-validator';
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

    constructor(data:{name:string,lastname: string,email: string,password: string}){
        this.email=data.email
        this.lastname=data.lastname
        this.name=data.name
        this.password=data.password
    }

}