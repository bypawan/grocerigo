import * as mongoose from "mongoose";

import { ModificationNote } from "../common/model";

export interface IProduct {
  _id?: mongoose.Types.ObjectId;
  name: String;
  description: String;
  price: Number;
  categories?: String[];
  isDeleted?: Boolean;
  modificationNotes: ModificationNote[];
}
