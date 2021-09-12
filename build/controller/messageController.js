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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = void 0;
const view_1 = require("../view/view");
const moment_1 = __importDefault(require("moment"));
const validator_1 = require("../messageValidator/validator");
const mongoose_1 = require("mongoose");
class Message {
    saveMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('workerId=>', process.pid);
                let message = request.body;
                let validationStatus = yield validator_1.messageValidator(message); // Validate message structure
                if (!validationStatus.status)
                    response.send("Message Validation Failed!");
                message.expireTime = yield exports.messageController.tempMessageExpireTime(message.messageTime);
                let messageBody = yield view_1.view.saveScheduledMessage(request.body);
                view_1.view.saveScheduledMessageToRedis(messageBody._id, message.expireTime - new Date().getTime()); // set timer for scheduled message 
                response.send("Message Scheduled");
            }
            catch (error) {
                throw error;
            }
        });
    }
    tempMessageExpireTime(time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var CurrentDate = moment_1.default(time).format();
                return new Date(CurrentDate).getTime();
            }
            catch (error) {
                throw error;
            }
        });
    }
    savePermanentMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                view_1.view.savePermanentMessage(message);
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchScheduledMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Msssssssssssssssssss');
                let message = yield view_1.view.findScheduledMessageById(messageId);
                message = {
                    messageTime: message.messageTime,
                    message: message.message,
                };
                exports.messageController.savePermanentMessage(message); //save message permanently
                view_1.view.deleteScheduledMessage([new mongoose_1.Types.ObjectId(messageId)]); // delete message from scheduled message
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendTempMessageToPermanentMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messageBody = [];
                let scheduledMessage = yield view_1.view.getPermanentMessage();
                if (scheduledMessage.length)
                    messageBody = scheduledMessage.map((ele) => {
                        return {
                            message: ele.message,
                            messageTime: ele.messageTime,
                            _id: ele._id
                        };
                    });
                exports.messageController.savePermanentMessage(messageBody); // move scheduled message to permanent message
                if (messageBody.length)
                    view_1.view.deleteScheduledMessage(messageBody); // delete scheduled message
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.messageController = new Message();
