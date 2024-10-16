import express from "express";
import {
	addCenter,
	deleteCenter,
	getCenters,
	updateCenter,
} from "../controllers/centerController.js";

// backend/routes/centerRouter.js
const router = express.Router();

router
	.route("/")
	.get(getCenters)
	.post(addCenter)
	.delete(deleteCenter)
	.put(updateCenter);

export default router;
