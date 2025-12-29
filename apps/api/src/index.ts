import express, { NextFunction, type Request, type Response } from "express";
import { errorhandler } from "./middleware";
import authRouter from "./routes/auth";
import featureRouter from "./routes/feature";

const app = express();

app.use(express.json())
app.use("", featureRouter);
app.use("", authRouter);

app.get("/health", (req : Request, res : Response, next : NextFunction) => {
  res.json({ message: "Server is up" });
});

app.use(errorhandler);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});