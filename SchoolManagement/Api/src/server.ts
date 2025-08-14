import express from "express";
import config from "./config";
import loader from "./loaders";
import logger from "./util/logger.util";
const app = express();
// const port = 3000;
console.log("--------", typeof app);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const collectServer = async () => {
  try {
    //loaders
    await loader(app);
    //loaders

    app
      .listen(config.port, () => {
        logger.info(`Express is listening at http://localhost:${config.port}`);
      })
      .on("error", (err) => {
        logger.info(`Error on serve listening ${err}`);
      });
  } catch (error) {
    console.error("server Error:- " + error);
  }
};
collectServer();

//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error({
    error_Message: "Unhandled Rejection at",
    promise: promise,
    reason: reason,
  });
});
