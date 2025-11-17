import { useContext, useMemo } from "react";
import { Usercontext } from "../context/Userscontext";

export const useTopUsers = () => {
  const { users } = useContext(Usercontext);

  const topUsers = useMemo(() => {
    return users.map(user => {
      const totalItems = (user.orders || []).reduce((acc, order) => {
        return acc + order.items.reduce((iAcc, item) => iAcc + item.quantity, 0);
      }, 0);

      return {
        name: user.name,
        value: totalItems
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  }, [users]);

  return topUsers;
};
