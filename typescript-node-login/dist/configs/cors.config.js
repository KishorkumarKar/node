"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsConfig = () => {
    var whitelist = ["http://example1.com", "http://example2.com"];
    return (0, cors_1.default)({
        origin: function (origin, callback) {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Content-Range"],
        credentials: true, // if this enable to send cookies
        preflightContinue: false,
        maxAge: 600, // this will cache preflight response for 10 mint -> avoid sending response multiple time
        optionsSuccessStatus: 204,
    });
};
