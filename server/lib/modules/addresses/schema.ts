import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const singleAddressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  addressLine: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length === 6;
      },
      message: (props) =>
        `${props.value} is not a valid pincode. Pincode must be exactly 6 characters long.`,
    },
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: (props) =>
        `${props.value} is not a valid number. Phone number must be exactly 10 characters long.`,
    },
  },
  isDeleted: { type: Boolean, default: false },
});

const addressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  addresses: {
    type: [singleAddressSchema],
    validate: {
      validator: function (addresses) {
        return addresses.length <= 5;
      },
      message: () =>
        "You have reached the maximum limit for saved addresses (5).",
    },
  },
});

singleAddressSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.email = this.email.toLowerCase();
  this.addressLine = this.addressLine.toLowerCase();
  this.state = this.state.toLowerCase();
  this.city = this.city.toLowerCase();

  next();
});

const Addresses = mongoose.model("Addresses", addressSchema);
export default Addresses;
