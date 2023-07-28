import * as mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      type: {
        id: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: "Number", required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
