import express, { type Request, type Response } from "express";
import prisma from "@workspace/db/client";

const app = express();
app.use(express.json())

app.get("/", (req : Request, res : Response) => {
  res.json({ message: "Hello World" });
});

app.post("/signup", async (req : Request, res : Response) => {
  console.log("here")
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      email: username,
      password,
    },
  });
  res.json({ message: "User signed up", user });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});