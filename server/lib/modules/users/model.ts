import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: String;
  email: String;
  password?: String;
  wishlist?: mongoose.Types.ObjectId;
  isDeleted?: Boolean;
  modificationNotes: ModificationNote[];
}
