// import {mongoose} from '../../../../config'
import mongoose from "../../../../config/mongo"
import {IUser} from '../interfaces'
export const UsersSchema = new mongoose.Schema<IUser>(
{
    name:{
        type:String,
        required:[true,'NAME_IS_REQUIRED'],
        trim:true
    },
    lastname:{
        type:String,
        trim:true
    },
    email:{
        type: String,
        required:[true,'EMAIL_IS_REQUIRED'],
        trim:true,
        unique:[true,'this email exists']
    },
    password:{
        type:String,
        required:[true,'PASSWORD_IS_REQUIRED'],
        trim:true
    }
}
)
export const UserModel = mongoose.model<IUser>("User", UsersSchema);