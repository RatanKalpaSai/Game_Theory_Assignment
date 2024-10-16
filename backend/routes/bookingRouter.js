import express from "express";
import {
	addBooking,
	deleteBooking,
	getBookings,
	updateBooking,
} from "../controllers/bookingController.js";

// backend/routes/bookingRouter.js
const router = express.Router();

router
	.route("/")
	.get(getBookings)
	.post(addBooking)
	.put(updateBooking)
	.delete(deleteBooking);

export default router;
