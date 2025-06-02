import express from "express";
import userRoute from "./routes/userRoutes";
import errorHandler from "./middlewares/errors/errorHandlerMiddleware";
const app = express();
const port = 9000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Node.js!.......**");
});
app.use("/api/users", userRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
