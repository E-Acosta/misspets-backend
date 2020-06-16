import { Document} from 'mongoose';
export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
export interface TokenDecode {
  userId: string
  iat: number
}