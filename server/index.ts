import { Hono } from "hono";

const app = new Hono();

const router = app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/api/people", (c) => {
    return c.json([
      { id: 1, name: "Asha" },
      { id: 2, name: "Sally" },
      { id: 3, name: "John" },
    ]);
  });

export type AppType = typeof router;
export default app;
