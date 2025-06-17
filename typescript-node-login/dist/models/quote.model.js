"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const quoteSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        default: "active",
    },
    first_name: {
        type: String,
        required: false,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    customer_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    subtotal: {
        type: Number,
        required: false,
    },
    product: [
        {
            type: new mongoose_1.default.Schema({
                _id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    auto: true,
                },
                product_id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "Product",
                    required: [true, "Product Id is required"],
                },
                type_id: {
                    type: String,
                    default: "simple",
                },
                sku: {
                    type: String,
                    required: [false, "Product Sku is required"],
                },
                qty: {
                    type: Number,
                    required: [false, "qty is required"],
                },
                price: {
                    type: Number,
                    required: [true, "price is required"],
                },
            }),
        },
        {
            timestamps: true,
        },
    ],
    address: [
        {
            type: new mongoose_1.default.Schema({
                _id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    auto: true,
                },
                customer_address_id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "User.Address",
                    required: false,
                },
                address_type: {
                    type: String,
                    require: [true, "Please provide street"],
                },
                street: {
                    type: String,
                    require: [true, "Please provide street"],
                },
                city: {
                    type: String,
                    require: [true, "Please provide city"],
                },
                zipcode: {
                    type: String,
                    require: [true, "Please provide zipcode"],
                },
                country: {
                    type: String,
                    require: [true, "Please provide country"],
                },
            }),
        },
        {
            timestamps: true,
        },
    ],
}, {
    timestamps: true,
});
const Quote = mongoose_1.default.model("Quote", quoteSchema);
exports.default = Quote;
