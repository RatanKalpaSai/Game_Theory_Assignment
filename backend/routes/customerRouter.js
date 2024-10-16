import express from "express";
import {
	getCustomers,
	addCustomer,
	deleteCustomer,
} from "../controllers/customerController.js";

// backend/routes/customerRouter.js
const router = express.Router();

router.route("/").get(getCustomers).post(addCustomer).delete(deleteCustomer);

export default router;
