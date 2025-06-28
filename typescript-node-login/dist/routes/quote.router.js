"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const quoteController_1 = require("../controllers/quoteController");
const quoteValidation_middleware_1 = require("../middlewares/validation/quote/quoteValidation.middleware");
router.get("/emptyCart", quoteController_1.generateEmptyQuote);
router.get("/getCart", quoteController_1.getQuote);
router.post("/product", quoteValidation_middleware_1.addProductValidation, quoteController_1.addProduct);
router.delete("/product/:id", quoteController_1.deleteProduct);
router.post("/billingAddress", (req, res) => {
    res.json("emptyCart");
});
router.put("/billingAddress/:id", (req, res) => {
    res.json("emptyCart");
});
router.post("/shippingAddress", (req, res) => {
    res.json("emptyCart");
});
router.put("/shippingAddress/:id", (req, res) => {
    res.json("emptyCart");
});
exports.default = router;
