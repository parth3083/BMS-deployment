import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { client } from "@repo/db/client";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server status OK");
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const email = req.body.email;

    const user = await client.user.create({
      data: {
        username,
        email,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      id: user.id,
    });
  } catch (error) {
    console.error(`Failed to create the user : ${error}`);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

app.listen(3002, () => {
  console.log(`Server startde on the port http://localhost:3000`);
});
