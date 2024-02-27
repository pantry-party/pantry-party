import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pantryPartyApi = createApi({
    reducerPath: "pantryPartyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://pantry-party.onrender.com/api/",
        prepareHeaders(headers) {
            headers.set("Content-type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["Item", "User", "Household", "Messages"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/users/${id}`,
            providesTags: ["User", "Household"]
        }),
        getHouseholdbyId: builder.query({
            query: (id) => `/households/id/${id}`,
            providesTags: ["Household", "User"]
        }),
        getHouseholdbyJoinCode: builder.query({
            query: (joinCode) => `/households/join/${joinCode}`,
            providesTags: ["Household"]
        }),
        getItembyId: builder.query({
            query: (id) => `/items/${id}`,
            providesTags: ["Item"]
        }),
        getItemsbyOwnerId: builder.query({
            query: (id) => `/items/owner/${id}`,
            providesTags: ["Item"]
        }),
        getItemsbyHouseholdId: builder.query({
            query: (id) => `/items/household/${id}`,
            providesTags: ["Item"]
        }),
        getPantryItemsbyHouseholdId: builder.query({
            query: (id) => `/items/household/${id}/pantry`,
            providesTags: ["Item", "User"]
        }),
        getGroceryItemsbyHouseholdId: builder.query({
            query: (id) => `/items/household/${id}/grocerylist`,
            providesTags: ["Item", "User"]
        }),
        getMessagesbyHouseholdId: builder.query({
            query: (id) => `/messages/${id}`,
            providesTags: ["Messages", "User", "Household"]
        }),
        createMessage: builder.mutation({
            query: (data) => ({
            url: "/messages",
            method: "POST",
            body: {...data} 
            }),
            invalidatesTags: ["Messages"]
        }),
        updateMessage: builder.mutation({
            query: (data) => ({
            url: `/messages/${data.id}`,
            method: "PUT",
            body: {...data}
            }),
            invalidatesTags: ["Messages"]
        }),
        deleteMessage: builder.mutation({
            query: (id) => ({
            url: `/messages/${id}`,
            method: "DELETE"
            }),
            invalidatesTags: ["Messages"]
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: {...data}
            }),
            invalidatesTags: ["User"]
        }),
        loginUser: builder.mutation({
            query: (data) => ({
                url: "/users/login",
                method: "POST",
                body: {...data}
            }),
            invalidatesTags: ["User"]
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}`,
                method: 'PATCH',
                body: {...data}
            }),
            invalidatesTags: ["User", "Household"]
        }),
        createUserHousehold: builder.mutation({
            query: (data) => ({
                url: "/households/user",
                method: "POST",
                body: {...data}
            }),
            invalidatesTags: ["Household"]
        }),
        createSharedHousehold: builder.mutation({
            query: (data) => ({
                url: "/households/shared",
                method: "POST",
                body: {...data}
            }),
            invalidatesTags: ["Household"]
        }),
        editHousehold: builder.mutation({
            query: (data) => ({
                url: `/households/${data.id}`,
                method: "PUT",
                body: {...data}
            }),
            invalidatesTags: ["Household"]
        }),
        createItem: builder.mutation({
            query: (data) => ({
                url: "/items",
                method: "POST",
                body: {...data}
            }),
            invalidatesTags: ["Item"]
        }),
        editItem: builder.mutation({
            query: (data) => ({
                url: `/items/${data.id}`,
                method: "PATCH",
                body: {...data}
            }),
            invalidatesTags: ["Item"]
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/items/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Item"]
        })
    })
})

export const {
    useGetUserQuery,
    useGetHouseholdbyIdQuery,
    useGetHouseholdbyJoinCodeQuery,
    useGetItembyIdQuery,
    useGetItemsbyOwnerIdQuery,
    useGetItemsbyHouseholdIdQuery,
    useGetPantryItemsbyHouseholdIdQuery,
    useGetGroceryItemsbyHouseholdIdQuery,
    useGetMessagesbyHouseholdIdQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useCreateUserMutation,
    useLoginUserMutation,
    useEditUserMutation,
    useCreateUserHouseholdMutation,
    useCreateSharedHouseholdMutation,
    useEditHouseholdMutation,
    useCreateItemMutation,
    useEditItemMutation,
    useDeleteItemMutation,
} = pantryPartyApi