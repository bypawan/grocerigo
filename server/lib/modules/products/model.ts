import { ModificationNote } from "../common/model";

export interface IProduct {
  _id?: String;
  name: String;
  description: String;
  price: Number;
  categories?: String[];
  isDeleted?: Boolean;
  modificationNotes: ModificationNote[];
}
