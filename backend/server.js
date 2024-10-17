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
// backend/server.js

connectDB();

const port = process.env.PORT || 5000;
const app = express();

const domain1 = process.env.DEV_MODE;
const domain2 = process.env.PROD_MODE;
const trustedDomains = [
	domain1, // Development environment
	domain2, // Production frontend
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// const Options = {
// 	origin: function (requestOrigin, callback) {
// 		if (!requestOrigin) return callback(null, true);
		
// 		if (trustedDomains.indexOf(requestOrigin)===-1) {
// 		  const egaAge = `Can't use this : ${requestOrigin}`;
// 		  return callback(new Error(egaAge), false);
// 		}
// 		return callback(null, true);
// 	},
// 	methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
// 	credentials: true,
// 	allowedHeaders: ['Content-Type','Authorization'],
// };

// app.use(cors(Options));
app.use(cors({
	origin: '*',
	methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
	credentials: true,
	allowedHeaders: ['Content-Type','Authorization'],
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
