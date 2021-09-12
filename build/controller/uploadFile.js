"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const { parentPort, receiveMessageOnPort, isMainThread } = require('worker_threads');
const insertController_1 = require("./insertController");
let array = [];
parentPort.on('message', (data) => {
    // let correctData=Buffer.from(data)
    console.log('I got Pinged', data);
    array.push(data);
    console.log();
    insertController_1.controller.uploadCsv();
    // new UploadFile();
    // console.log('Worker thread got data:', data);
    // function workerThreadFunction() {
    //     for (let i = 0; i < 100000; i++) {
    //         console.log('workerThread', i);
    //     }
    //     console.log('DONE!!!!');
    //     return;
    // }
    // workerThreadFunction()
});
class UploadFile {
    constructor() {
        UploadFile.uploadFile();
    }
    static uploadFile() {
        try {
            process.on('message', (data) => {
                console.log('data for request', Buffer.from(data.data));
                insertController_1.controller.uploadCsv(Buffer.from(data.data.data));
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UploadFile = UploadFile;
