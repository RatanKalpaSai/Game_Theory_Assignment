import asyncHandler from "express-async-handler";
import Center from "../models/centerModel.js";

// backend/controllers/centerController.js
export const getCenters = asyncHandler(async (req, res) => {
	const centers = await Center.find({});
	res.status(200).send(centers);
});

export const addCenter = asyncHandler(async (req, res) => {
	const { name, kind, cnt } = req.body;
	const existCenter = await Center.findOne({ name, kind });
	if (existCenter) {
		res.status(400);
		throw new Error("This court already exists");
	}

	const newCenter = await Center.create({ name, kind, cnt });

	if (newCenter) {
		res.status(200).json({ message: "New court available!" });
	} else {
		res.status(400);
		throw new Error("Invalid court");
	}
});

export const deleteCenter = asyncHandler(async (req, res) => {
	const { name, kind } = req.body;
	const existCenter = await Center.findOne({ name, kind });
	if (existCenter) {
		await Center.deleteOne({ name, kind });
		res.status(200).json({
			message: kind + " court is not available in " + name,
		});
	} else {
		res.status(404);
		throw new Error("Court not found");
	}
});

export const updateCenter = asyncHandler(async (req, res) => {
	const { name, kind, cnt, oldName, oldKind } = req.body;
	const existCenter = await Center.findOne({ name: oldName, kind: oldKind });
	if (existCenter) {
		existCenter.name = name;
		existCenter.kind = kind;
		existCenter.cnt = cnt;
		await existCenter.save();
		res.status(200).json({ message: "Successfully updated!" });
	} else {
		res.status(404);
		throw new Error("No such court");
	}
});
