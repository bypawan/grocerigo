import { ModificationNote } from "../common/model";

export interface IUser {
  _id?: String;
  name: String;
  email: String;
  password?: String;
  wishlist?: String[];
  isDeleted?: Boolean;
  modificationNotes: ModificationNote[];
}
