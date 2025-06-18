import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./configs/dbConnection";
connectDb();
import corsConfig from "./configs/cors.config";
import userRoute from "./routes/userRoutes";
import quoteRouter from "./routes/quote.router";
import errorHandler from "./middlewares/errors/errorHandlerMiddleware";
const app = express();
const port = process?.env?.PORT ? process?.env?.PORT : 5000;

app.use(corsConfig());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Node.js!.......**");
});
app.use("/api/users", userRoute);
app.use("/api/quote", quoteRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
