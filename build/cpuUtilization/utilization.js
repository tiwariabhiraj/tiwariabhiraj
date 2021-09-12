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
exports.cpuUtilization = void 0;
const constant_1 = require("../constant/constant");
// let os = require('os');
const os = require('os-utils');
class CpuUtilization {
    constructor() {
    }
    resetCounter(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('restet counter ');
                os.cpuUsage(function (v) {
                    if (v > 70) {
                        //restart sertver
                    }
                });
                client.setex(constant_1.CPU_UT_TIMER, constant_1.COUNTER_AMT, JSON.stringify({ type: constant_1.CPU_UT_TIMER }));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.cpuUtilization = new CpuUtilization();
