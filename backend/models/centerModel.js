import mongoose from "mongoose";

// backend/models/centerModel.js
const centerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		kind: { type: String, required: true },
		cnt: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Center = mongoose.model("Center", centerSchema);

export default Center;
