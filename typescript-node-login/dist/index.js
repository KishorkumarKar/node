"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnection_1 = __importDefault(require("./configs/dbConnection"));
(0, dbConnection_1.default)();
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const quote_router_1 = __importDefault(require("./routes/quote.router"));
const errorHandlerMiddleware_1 = __importDefault(require("./middlewares/errors/errorHandlerMiddleware"));
const app = (0, express_1.default)();
const port = process?.env?.PORT ? process?.env?.PORT : 5000;
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello from TypeScript + Node.js!.......**");
});
app.use("/api/users", userRoutes_1.default);
app.use("/api/quote", quote_router_1.default);
app.use(errorHandlerMiddleware_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
