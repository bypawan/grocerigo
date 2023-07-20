import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: {
      first_name: {
        type: String,
        required: true,
      },
      middle_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
  },
  email: String,
  phone_number: String,
  gender: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  modification_notes: [ModificationNote],
});

export default mongoose.model("users", schema);
