"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.policy_info = void 0;
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const policyInfoSchema = new mongoose_1.Schema({
    policy_number: { type: String, required: false },
    policy_start_date: { type: String, required: false },
    policy_end_date: { type: String, required: false },
    policy_category: { type: String, required: false },
    company_id: { type: mongoose_1.Types.ObjectId, required: true },
    userId: { type: mongoose_1.Types.ObjectId, required: true },
}, {
    versionKey: false,
    timestamps: true
});
exports.policy_info = mongoose.model('policy_info', policyInfoSchema);
