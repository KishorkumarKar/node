"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const userValidation_middleware_1 = require("../middlewares/validation/User/userValidation.middleware");
const router = express_1.default.Router();
router.post("/login", userValidation_middleware_1.userLoginValidation, userControllers_1.loginUser);
router.post("/register", userValidation_middleware_1.userRegisterValidation, userControllers_1.registerUser);
exports.default = router;
