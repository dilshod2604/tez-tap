import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryExtends: BaseQueryFn = async (arg, api, extraOptions) => {
  try {
    const result = await BaseQuery(arg, api, extraOptions);
    if (result.error) {
      console.error("Ошибка запроса:", result.error);
    }
    return result;
  } catch (error) {
    console.error("Ошибка CORS или другая проблема:", error);
    return { error };
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtends,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["auth", "order"],
  endpoints: () => ({}),
});
