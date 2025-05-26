import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    registerCaptain: builder.mutation({
      query: (captainData) => ({
        url: "/captain/register",
        method: "POST",
        body: captainData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginCaptain: builder.mutation({
      query: (captainData) => ({
        url: "/captain/login",
        method: "POST",
        body: captainData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRegisterCaptainMutation,
  useLoginCaptainMutation,
} = authApi;
