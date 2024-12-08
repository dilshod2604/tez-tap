namespace ORDER {
  type SendOrderResponse = OrderResponse;
  type SendOrderRequest = FormData;

  type GetOrdersResponse = OrderResponse[];
  type GetOrdersRequest = void;

  type EditOrderResponse = OrderResponse;
  type EditOrderRequest = {
    id: nimber;
    data: FormData;
  };

  type GetOrderResponse = OrderResponse;
  type GetOrderRequest = number;
}
