import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import customerRouter from "./routes/customerRouter.js";
import centerRouter from "./routes/centerRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const domain1 = process.env.DEV_MODE;
const domain2 = process.env.PROD_MODE;
const trustedDomains = [
	domain1, // Development environment
	domain2, // Production frontend
];
// backend/server.js

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
	origin: function (requestOrigin, callback) {
		if (!requestOrigin) return callback(null, true);
		
		if (!trustedDomains.includes(requestOrigin)) {
		  const egaAge = `Can't use this : ${requestOrigin}`;
		  return callback(new Error(egaAge), false);
		}
		return callback(null, true);
	}
}));

app.use("/api/customer", customerRouter);
app.use("/api/center", centerRouter);
app.use("/api/booking", bookingRouter);

app.get("/", (req, res) => res.send("hello"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log("Server is running now");
});
