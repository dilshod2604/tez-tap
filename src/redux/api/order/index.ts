import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    sendOrder: build.mutation<ORDER.SendOrderResponse, ORDER.SendOrderRequest>({
      query: (order) => ({
        url: "/orders/",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["order"],
    }),
    getOrders: build.query<ORDER.GetOrdersResponse, ORDER.GetOrdersRequest>({
      query: () => ({
        url: "/orders/",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    editOrders: build.mutation<ORDER.EditOrderResponse, ORDER.EditOrderRequest>(
      {
        query: ({ id, data }) => ({
          url: `/orders/${id}/`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["order"],
      }
    ),
    getOrder: build.query<ORDER.EditOrderResponse, ORDER.GetOrderRequest>({
      query: (id) => ({
        url: `/orders/${id}/`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});
export const {
  useSendOrderMutation,
  useGetOrdersQuery,
  useEditOrdersMutation,
  useGetOrderQuery,
} = api;
