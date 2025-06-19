import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./configs/dbConnection";
connectDb();
import corsConfig from "./configs/cors.config";
import userRoute from "./routes/userRoutes";
import quoteRouter from "./routes/quote.router";
import errorHandler from "./middlewares/errors/errorHandlerMiddleware";
import { urlVersioning } from "./middlewares/apiVersioning";
import customLoggerMiddleware from "./middlewares/customs/customLogger.middleware";
const app = express();
const port = process?.env?.PORT ? process?.env?.PORT : 5000;

app.use(customLoggerMiddleware); // to print all log
app.use(corsConfig());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Node.js!.......**");
});
app.use(urlVersioning("api")); // this to validate API version at this moment API starting with `api`
app.use("/api/users", userRoute);
app.use("/api/quote", quoteRouter);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).send("Route not found....");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
