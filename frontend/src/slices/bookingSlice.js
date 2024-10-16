import { apiSlice } from "./apiSlice";
// import { BOOKING_URL } from "../constants";

const BOOKING_URL = import.meta.env.VITE_API_BOOKING_URL;
// frontend/src/slices/bookingSlice.js
export const bookingApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addBooking: builder.mutation({
			query: (data) => ({
				url: BOOKING_URL,
				method: "post",
				body: data,
			}),
		}),
		getBookings: builder.query({
			query: ({ date, time, center }) => ({
				url:
					BOOKING_URL +
					"?date=" +
					date +
					"&time=" +
					time +
					"&center=" +
					center,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Booking"],
		}),
		deleteBooking: builder.mutation({
			query: (data) => ({
				url: BOOKING_URL,
				method: "delete",
				body: data,
			}),
		}),
		updateBooking: builder.query({
			query: (data) => ({
				url: BOOKING_URL,
				method: "put",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetBookingsQuery,
	useAddBookingMutation,
	useUpdateBookingQuery,
	useDeleteBookingMutation,
} = bookingApiSlice;
