
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { generateChecklistDocs } from "../utils/generateDocs";

// ---- Local Storage Helpers ----
const LS_KEY = "NCBA_CHECKLISTS";

const loadFromStorage = () => {
  const data = localStorage.getItem(LS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
};

export const checklistApi = createApi({
  reducerPath: "checklistsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Checklists"],

  endpoints: (builder) => ({
    // ----------------------------------------------------
    // GET ALL CHECKLISTS
    // ----------------------------------------------------
    getChecklists: builder.query({
      queryFn: () => {
        const data = loadFromStorage();
        return { data };
      },
      providesTags: ["Checklists"],
    }),

    // ----------------------------------------------------
    // CREATE CHECKLIST
    // ----------------------------------------------------
    createChecklist: builder.mutation({
      queryFn: (payload) => {
        const all = loadFromStorage();

        const newChecklist = {
          id: Date.now().toString(),
          customerName: payload.customerName,
          loanType: payload.loanType,
          rmId: payload.rmId,
          rmName: payload.rmName,
          rmEmail: payload.rmEmail,
          status: "Pending RM",
          createdAt: new Date().toISOString(),
          documents: generateChecklistDocs(payload.loanType),
        };

        all.push(newChecklist);
        saveToStorage(all);

        return { data: newChecklist };
      },
      invalidatesTags: ["Checklists"],
    }),

    // ----------------------------------------------------
    // UPDATE DOCUMENT STATUS
    // ----------------------------------------------------
    updateDocument: builder.mutation({
      queryFn: (payload) => {
        let all = loadFromStorage();
        let checklist = all.find((c) => c.id === payload.checklistId);

        if (!checklist) return { error: "Checklist not found" };

        if (payload.submitRM) {
          checklist.status = "RM Submitted";
        } else {
          checklist.documents = checklist.documents.map((d) =>
            d.name === payload.docName
              ? { ...d, status: payload.status }
              : d
          );
        }

        saveToStorage(all);
        return { data: checklist };
      },
      invalidatesTags: ["Checklists"],
    }),

    // ----------------------------------------------------
    // UPDATE CHECKLIST STATUS (CO → Verifier)
    // ----------------------------------------------------
    updateChecklistStatus: builder.mutation({
      queryFn: ({ id, status }) => {
        let all = loadFromStorage();
        let checklist = all.find((c) => c.id === id);
        if (!checklist) return { error: "Not found" };

        checklist.status = status;
        saveToStorage(all);

        return { data: checklist };
      },
      invalidatesTags: ["Checklists"],
    }),
  }),
});

export const {
  useGetChecklistsQuery,
  useCreateChecklistMutation,
  useUpdateDocumentMutation,
  useUpdateChecklistStatusMutation,
} = checklistApi;
