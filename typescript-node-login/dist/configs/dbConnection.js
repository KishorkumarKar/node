"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const custom_environment_variables_config_1 = __importDefault(require("./custom-environment-variables.config"));
const connectDb = async () => {
    try {
        const connect = await mongoose_1.default.connect(custom_environment_variables_config_1.default.MONGODB_CONNECTION_STRING);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.default = connectDb;
