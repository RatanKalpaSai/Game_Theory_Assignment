import mongoose from "mongoose";

// backend/models/customerModel.js
const customerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
