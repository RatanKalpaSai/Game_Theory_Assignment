import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// frontend/src/slices/apiSlice.js
export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Customer", "Center", "Booking"],
	endpoints: (builder) => ({}),
});
