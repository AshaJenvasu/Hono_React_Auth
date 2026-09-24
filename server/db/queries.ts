import { db } from "./db";

export const getTodos = async () => {
  return await db.todos.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
