import { ModificationNote } from "../common/model";

export interface IProduct {
  _id?: String;
  name: String;
  description: String;
  price: Number;
  category?: String[];
  is_deleted?: Boolean;
  modification_notes: ModificationNote[];
}
