import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: [String],
  isDeleted: {
    type: Boolean,
    default: false,
  },
  modificationNotes: [ModificationNote],
});

const Products = mongoose.model("Products", productSchema);

export default Products;
