import { apiSlice } from "./apiSlice";
import { CENTER_URL } from "../constants";

// frontend/src/slices/centerSlice.js
export const centerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addCenter: builder.mutation({
			query: (data) => ({
				url: CENTER_URL,
				method: "POST",
				body: data,
			}),
		}),
		getCenters: builder.query({
			query: () => ({
				url: CENTER_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Center"],
		}),
		deleteCenter: builder.mutation({
			query: (data) => ({
				url: CENTER_URL,
				method: "delete",
				body: data,
			}),
		}),
		updateCenter: builder.mutation({
			query: (data) => ({
				url: CENTER_URL,
				method: "put",
				body: data,
			}),
		}),
	}),
});

export const {
	useAddCenterMutation,
	useGetCentersQuery,
	useDeleteCenterMutation,
	useUpdateCenterMutation,
} = centerApiSlice;
