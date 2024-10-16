// import { CUSTOMER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const CUSTOMER_URL = import.meta.env.VITE_API_CUSTOMER_URL;
// frontend/src/slices/customerSlice.js
export const customerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addUser: builder.mutation({
			query: (data) => ({
				url: CUSTOMER_URL,
				method: "POST",
				body: data,
			}),
		}),
		getUsers: builder.query({
			query: () => ({
				url: CUSTOMER_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Customer"],
		}),
		deleteUser: builder.mutation({
			query: (data) => ({
				url: CUSTOMER_URL,
				method: "delete",
				body: data,
			}),
		}),
	}),
});

export const { useAddUserMutation, useGetUsersQuery, useDeleteUserMutation } =
	customerApiSlice;
