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
  category: [String],
  is_deleted: {
    type: Boolean,
    default: false,
  },
  modification_notes: [ModificationNote],
});

const Products = mongoose.model("Products", productSchema);

export default Products;
