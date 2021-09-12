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
exports.RedisClient = exports.client = void 0;
const utilization_1 = require("./cpuUtilization/utilization");
const constant_1 = require("./constant/constant");
class RedisClient {
    constructor(redis) {
        this.init(redis);
    }
    init(redis) {
        return __awaiter(this, void 0, void 0, function* () {
            const CONF = { db: 0 };
            exports.client = redis.createClient(constant_1.REDIS.PORT, constant_1.REDIS.HOST, CONF, { disable_resubscribing: true });
            let subscriber = redis.createClient(constant_1.REDIS.PORT, constant_1.REDIS.HOST, CONF, { disable_resubscribing: true });
            exports.client.on("ready", () => {
                utilization_1.cpuUtilization.resetCounter(exports.client);
                console.log('redis server running');
            });
            exports.client.on("error", (error) => {
                console.log("Error in Redis", error);
            });
            subscriber.subscribe('__keyevent@0__:expired', (err, data) => {
                console.log("subscribe====>", data);
            });
            subscriber.on("message", (channel, message, data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log(message);
                    if (JSON.parse(message).type == 'scheduled_messgae') {
                        worker.send({ data });
                        // messageController.fetchScheduledMessage(JSON.parse(message)._id)
                    }
                    // if (message == CPU_UT_TIMER)
                    //     cpuUtilization.resetCounter(client)
                }
                catch (error) {
                    throw error;
                }
            }));
            return subscriber;
        });
    }
}
exports.RedisClient = RedisClient;
