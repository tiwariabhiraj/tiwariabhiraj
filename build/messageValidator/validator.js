"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const messageValidator = (data) => {
    function validateUser(data) {
        const JoiSchema = joi_1.default.object({
            message: joi_1.default.string()
                .required(),
            messageTime: joi_1.default.string()
                .required()
        }).options({ abortEarly: false });
        return JoiSchema.validate(data);
    }
    let response = validateUser(data);
    if (response.error) {
        return { status: false, error: response.error };
    }
    else {
        return { status: true };
    }
};
exports.messageValidator = messageValidator;
