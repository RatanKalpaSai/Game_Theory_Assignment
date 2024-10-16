import mongoose from "mongoose";

// backend/models/bookingModel.js
const bookingSchema = new mongoose.Schema(
	{
		user: { type: String, required: true },
		center: { type: String, required: true },
		kind: { type: String, required: true },
		cnt: { type: Number, required: true },
		date: { type: String, required: true }, // Date is very annoying
		time: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
