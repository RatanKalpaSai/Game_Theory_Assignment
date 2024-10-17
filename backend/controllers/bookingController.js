import asyncHandler from "express-async-handler";
import Booking from "../models/bookingModel.js";

// backend/controllers/bookingController.js
export const getBookings = asyncHandler(async (req, res) => {
	const { center, kind, date } = req.query;
	console.log(center, kind, date);
	const bookings = await Booking.find({ center, kind, date });
	console.log(bookings);
	res.status(200).json(bookings);
});

export const addBooking = asyncHandler(async (req, res) => {
	const { user, center, kind, cnt, date, time } = req.body;
	const existBooking = await Booking.findOne({
		center,
		kind,
		cnt,
		date,
		time,
	});
	if (existBooking) {
		res.status(401);
		throw new Error("Already booked!");
	}
	const newBooking = await Booking.create({
		user,
		center,
		kind,
		cnt,
		date,
		time,
	});
	if (newBooking) res.status(200).json({ message: "New booking arrived" });
	else {
		res.status(400);
		throw new Error("Invalid booking");
	}
});

export const deleteBooking = asyncHandler(async (req, res) => {
	const { center, kind, cnt, date, time } = req.body;
	const existBooking = await Booking.findOne({
		center,
		kind,
		cnt,
		date,
		time,
	});
	if (existBooking) {
		await Booking.deleteOne({ center, kind, cnt, date, time });
		res.status(200).json({
			message: "Booking is cancelled",
		});
	} else {
		res.status(404);
		throw new Error("Not booked yet");
	}
});

export const updateBooking = asyncHandler(async (req, res) => {
	const {
		center,
		kind,
		cnt,
		date,
		time,
		user,
		oldUser,
		oldCenter,
		oldKind,
		oldDate,
		oldTime,
		oldCnt,
	} = req.body;
	console.log(oldUser, oldCenter, oldKind, oldDate, oldTime, oldCnt);
	const existBooking = await Booking.findOne({
		center: oldCenter,
		kind: oldKind,
		cnt: oldCnt,
		date: oldDate,
		time: oldTime,
		user: oldUser,
	});
	if (existBooking) {
		existBooking.user = user;
		existBooking.center = center;
		existBooking.kind = kind;
		existBooking.date = date;
		existBooking.time = time;
		existBooking.cnt = cnt;

		await existBooking.save();
		res.status(200).json({ message: "Booking updated!" });
	} else {
		res.status(404);
		throw new Error("No booking yet");
	}
});
