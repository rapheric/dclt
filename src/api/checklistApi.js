import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checklistApi = createApi({
  reducerPath: "checklistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/checklists", // CHANGE IF YOU DEPLOY
  }),

  tagTypes: ["Checklist"],

  endpoints: (builder) => ({
    // CREATE CHECKLIST
    createChecklist: builder.mutation({
      query: (newChecklist) => ({
        url: "/",
        method: "POST",
        body: newChecklist,
      }),
      invalidatesTags: ["Checklist"],
    }),

    

    // GET PAGINATED CHECKLISTS
    getChecklists: builder.query({
      query: ({ page = 1, limit = 4 }) =>
        `/?page=${page}&limit=${limit}`,
      providesTags: ["Checklist"],
    }),

    // GET ONE CHECKLIST
    getChecklistById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Checklist"],
    }),

    // COUNT
    countChecklists: builder.query({
      query: () => `/count`,
      providesTags: ["Checklist"],
    }),

    // UPDATE A DOCUMENT (status, comment, fileUrl)
    updateDocument: builder.mutation({
      query: ({ checklistId, catIdx, docIdx, payload }) => ({
        url: `/${checklistId}/${catIdx}/${docIdx}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Checklist"],
    }),
  }),
});

export const {
  useCreateChecklistMutation,
  useGetChecklistsQuery,
  useGetChecklistByIdQuery,
  useCountChecklistsQuery,
  useUpdateDocumentMutation,
} = checklistApi;
