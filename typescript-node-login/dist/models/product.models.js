"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    type_id: {
        type: String,
        required: [true, "Type is required"],
    },
    sku: {
        type: String,
        required: [true, "Sku is required"],
    },
    qty: {
        type: Number,
        required: [true, "Qty is required"],
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
}, {
    timestamps: true,
});
const Product = (mongoose_1.default.models.product) ||
    mongoose_1.default.model("product", productSchema);
exports.default = Product;
