import { useMemo } from "react";

export const useTopUsersFromOrders = (orders) => {
  return useMemo(() => {
    if (!orders || orders.length === 0) return [];

    const userMap = {};

    orders.forEach(order => {
      const phone = order.shippingPhone || "Unknown";

      const totalQty = (order.items || []).reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );

      if (!userMap[phone]) {
        userMap[phone] = {
          name: order.shippingFullName || "Unknown",
          value: 0
        };
      }

      userMap[phone].value += totalQty;
    });

    return Object.values(userMap)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

  }, [orders]);
  
};