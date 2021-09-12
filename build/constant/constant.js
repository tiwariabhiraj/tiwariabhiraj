"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_CRED = exports.REDIS = exports.COUNTER_AMT = exports.CPU_UT_TIMER = exports.ASSIGNED_WORK_TYPE = exports.SERVER = void 0;
const SERVER = {
    PORT: process.env['PORT']
};
exports.SERVER = SERVER;
const REDIS = {
    PORT: process.env['REDIS_PORT'],
    HOST: process.env['REDIS_HOST']
};
exports.REDIS = REDIS;
const ASSIGNED_WORK_TYPE = {
    UPLOAD_DOCUMENT: "UPLOAD_DOCUMENT"
};
exports.ASSIGNED_WORK_TYPE = ASSIGNED_WORK_TYPE;
const MONGO_CRED = {
    MONGO_DB_URL: process.env['MONGO_DB_URL']
};
exports.MONGO_CRED = MONGO_CRED;
const CPU_UT_TIMER = "CPU_UT_TIMER";
exports.CPU_UT_TIMER = CPU_UT_TIMER;
const COUNTER_AMT = 2 * 60;
exports.COUNTER_AMT = COUNTER_AMT;
