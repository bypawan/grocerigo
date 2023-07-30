import * as mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
  ],
});

const Wishlists = mongoose.model("Wishlists", wishlistSchema);
export default Wishlists;
