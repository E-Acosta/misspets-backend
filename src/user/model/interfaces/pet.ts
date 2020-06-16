import { Document} from 'mongoose';
import mongoose from '../../../../config/mongo';

export interface IPet extends Document {
    owner:mongoose.Types.ObjectId,
    name:string,
    type:string,
    address:string,
    phone:string,
    date:string,
    description:string,
    found:boolean,
    image:string   
}