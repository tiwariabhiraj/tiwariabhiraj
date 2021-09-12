"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../model/index");
const redis_1 = require("../redis");
class View {
    insertUserData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.users.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertAccountData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.account.create(data, (data1, data2) => {
                    console.log('data updated', data2);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertAgentData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.agents.create(data, (data1, data2) => {
                    console.log('data updated', data2);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertPolicyCarrierData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.policy_carrier.create(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertpolicyCategoryData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.policy_category.create(data, (data1, data2) => {
                    console.log('data updated', data2);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertPolicyInfoData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                index_1.policy_info.create(data, (data1, data2) => {
                    console.log('data updated', data2);
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    searchPolicyInfo(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let match = {
                    firstname: { "$regex": userName, "$options": "-i" }
                };
                let aggPipe = [];
                aggPipe.push({ $match: match });
                let lookup = {
                    from: "policy_infos",
                    localField: "_id",
                    foreignField: "userId",
                    as: "policyInfo"
                };
                aggPipe.push({ $lookup: lookup });
                let options = { lean: true };
                return yield index_1.users.aggregate(aggPipe, options);
            }
            catch (error) {
                throw error;
            }
        });
    }
    aggregatePolicyOfUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aggPipe = [];
                let lookup = {
                    from: "policy_infos",
                    localField: "_id",
                    foreignField: "userId",
                    as: "policyInfo"
                };
                aggPipe.push({ $lookup: lookup });
                let options = { lean: true };
                return yield index_1.users.aggregate(aggPipe, options);
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveScheduledMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.scheduled_message.create(params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    savePermanentMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield index_1.message.create(params);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findScheduledMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let match = {
                    _id: new mongoose_1.Types.ObjectId(messageId)
                };
                return yield index_1.scheduled_message.findOne(match);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteScheduledMessage(messageArray) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                messageArray = messageArray.map((ele) => {
                    return ele._id;
                });
                let match = {
                    _id: { $in: messageArray }
                };
                return yield index_1.scheduled_message.deleteMany(match);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getPermanentMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let match = {
                    expireTime: { $lte: new Date().getTime() }
                };
                return yield index_1.scheduled_message.find(match);
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveScheduledMessageToRedis(messageId, timer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(messageId, timer);
                timer = 5;
                let ounterKey = {
                    type: 'scheduled_messgae',
                    _id: messageId
                };
                return redis_1.client.setex(JSON.stringify(ounterKey), timer, JSON.stringify({ type: "timer" }));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.view = new View();
