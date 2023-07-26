import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  wishlist: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  modificationNotes: [ModificationNote],
});

userSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();

  next();
});

// Exclude the password field from query results
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Users = mongoose.model("Users", userSchema);

export default Users;
