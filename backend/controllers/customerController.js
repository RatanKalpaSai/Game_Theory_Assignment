import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";

// backend/controllers/customerController.js
export const getCustomers = asyncHandler(async (req, res) => {
	const user = await Customer.find({});
	res.status(200).send(user);
});

export const addCustomer = asyncHandler(async (req, res) => {
	const { name, age } = req.body;
	const existUser = await Customer.findOne({ name, age });
	if (existUser) {
		res.status(400);
		throw new Error("Customer already exists. Please use another name");
	}
	const newUser = await Customer.create({ name, age });

	if (newUser) {
		res.status(201).json({ message: name + " registered!" });
	} else {
		res.status(400);
		throw new Error("Invalid customer data");
	}
});

export const deleteCustomer = asyncHandler(async (req, res) => {
	const { name, age } = req.body;
	const existUser = await Customer.findOne({ name, age });
	if (existUser) {
		await Customer.deleteOne({ name, age });
		res.status(200).json({
			message: name + " deleted!",
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});
