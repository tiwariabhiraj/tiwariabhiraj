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
exports.WorkerThreads = exports.mainWorker = void 0;
const cluster = require('cluster');
const constant_1 = require("../constant/constant");
const totalCPUs = require('os').cpus().length;
const insertController_1 = require("../controller/insertController");
class WorkerThreads {
    constructor(process, app) {
        this.process = process;
        this.app = app;
        this.startServer(this.process, this.app);
    }
    startServer(process, app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (cluster.isMaster) {
                    const worker = cluster.fork();
                    worker.on("message", (data) => {
                        console.log('got message here', data);
                        if (data && data.taskType == constant_1.ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                            console.log("ddddddddddddddddddddd");
                            insertController_1.controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                        }
                    });
                    // for (let i = 0; i < totalCPUs; i++) {
                    //     if (i == 0) {
                    //         mainWorker = cluster.fork();
                    //         mainWorker.on('message', (data: any) => {
                    //             if (data && data.taskType == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                    //                 console.log("ddddddddddddddddddddd");
                    //                 controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                    //             }
                    //         })
                    //     } else {
                    //         let worker = cluster.fork();
                    //         worker.on('message', (data: any) => {
                    //             if (data && data.taskType == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                    //                 controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                    //             }
                    //         })
                    //     }
                    // }
                    // cluster.on('exit', (worker: any, code: any, signal: any) => {
                    //     cluster.fork();
                    // });
                }
                else {
                    app.listen(constant_1.SERVER.PORT, () => {
                        console.log(`App listening on port ${constant_1.SERVER.PORT}`);
                    });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.WorkerThreads = WorkerThreads;
