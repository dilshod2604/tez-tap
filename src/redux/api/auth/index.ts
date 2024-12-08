import { api as index } from "..";
import { AUTH } from "./types";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<AUTH.UserSignUpResponse, AUTH.UserSignUpRequest>({
      query: (data) => ({
        url: "users/signup/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    signIn: build.mutation<AUTH.UserSignInResponse, AUTH.UserSignInRequest>({
      query: (data) => ({
        url: "/users/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getUser: build.query<AUTH.GetUserResponse, AUTH.GetUserRequest>({
      query: (id) => ({
        url: `/users/${id}/`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    editUser: build.mutation<AUTH.EditUserResponse, AUTH.EditUserRequest>({
      query: ({ id, data }) => ({
        url: `/users/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    passwordResset: build.mutation<
      AUTH.RessetPasswordResponse,
      AUTH.RessetPasswordRequest
    >({
      query: (data) => ({
        url: "/users/password-reset/",
        method: "POST",
        body: data,
      }),
    }),
    confirmPassword: build.mutation<
      AUTH.ConfirmPasswordResponse,
      AUTH.ConfirmPasswordRequest
    >({
      query: ({ uidb64, token, newpassword }) => ({
        url: `/users/password-reset-confirm/${uidb64}/${token}/`,
        method: "POST",
        body: newpassword,
      }),
    }),
  }),
});
export const {
  useSignUpMutation,
  useSignInMutation,
  useGetUserQuery,
  useEditUserMutation,
  usePasswordRessetMutation,
  useConfirmPasswordMutation,
} = api;
