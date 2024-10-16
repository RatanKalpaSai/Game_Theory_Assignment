import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

import customerRouter from "./routes/customerRouter.js";
import centerRouter from "./routes/centerRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// backend/server.js
dotenv.config();

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/customer", customerRouter);
app.use("/api/center", centerRouter);
app.use("/api/booking", bookingRouter);

app.get("/", (req, res) => res.send("hello"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log("Server is running now");
});
