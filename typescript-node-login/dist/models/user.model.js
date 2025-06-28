"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: [true, "Please add the user name"],
    },
    last_name: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    address: [
        {
            type: new mongoose_1.default.Schema({
                _id: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    auto: true,
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
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
