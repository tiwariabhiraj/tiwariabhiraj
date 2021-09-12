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
exports.controller = void 0;
const view_1 = require("../view/view");
const fs_1 = __importDefault(require("fs"));
const reader = require('xlsx');
// const childP = require("./childProcess")
const path = require("path");
const { Worker, isMainThread, parentPort } = require('worker_threads');
let worker;
if (isMainThread) {
    const modulePath = path.resolve(__dirname, `uploadFile.js`);
    worker = new Worker(modulePath);
    worker.on('message', (message) => {
        console.log("Got a message from worker", message);
    });
    worker.on('exit', () => {
        console.log('Worker thread Exit');
    });
    // worker.postMessage('Hello, Abhishek!');
}
class Controller {
    constructor() {
        this.fileupload = (csvFile) => __awaiter(this, void 0, void 0, function* () {
            new Promise((resolve, reject) => {
                fs_1.default.writeFileSync("test.xlsx", csvFile);
                resolve({});
            });
        });
    }
    assignToChildProcess(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.controller.fileupload(request.files.csvsheet.data);
            // if (!request.files) {
            //     console.log('request.files', request.files);
            //     response.send("File was not found");
            //     return;
            // }
            // console.log('dddddddd');
            // // child_process.send({ type: ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT, data: request.files.csvsheet.data })
            // // controller.uploadCsv(request.files.csvsheet.data);
            // response.send("File is uploading it will take some time to complete the task,Thanku! ");
            // childP.SendJobToChildProcess(request.files.csvsheet.data)
            worker.postMessage({ data: "data" });
        });
    }
    uploadCsv(csvBufferData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('csvBufferData', csvBufferData);
                console.log('processId==', process.pid);
                // await controller.fileupload(csvBufferData)
                const file = reader.readFile('./test.xlsx');
                // fs.unlink('./test.xlsx', (err: any) => {
                //     if (err) throw err;
                //     console.log("csv file deleted successfully");
                // });
                let data = [];
                const sheets = file.SheetNames;
                for (let i = 0; i < sheets.length; i++) {
                    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
                    temp.forEach((response) => {
                        data.push(response);
                    });
                }
                console.log(data[0]);
                yield exports.controller.uploadDocumentIntoDatabase(data);
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertDataInMongoDatabase(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                Promise.all([
                    view_1.view.insertAccountData(data),
                    view_1.view.insertAgentData(data),
                    view_1.view.insertpolicyCategoryData(data),
                ]).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            }));
        });
    }
    insertUserAndCompanyData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                Promise.all([
                    view_1.view.insertUserData(data),
                    view_1.view.insertPolicyCarrierData(data),
                ]).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                });
            }));
        });
    }
    insertSynchronousData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let insertedData;
                for (let insertData of data) {
                    insertedData = yield exports.controller.insertUserAndCompanyData(insertData);
                    insertData['userId'] = insertedData[0]._id;
                    insertData['company_id'] = insertedData[1]._id;
                    view_1.view.insertPolicyInfoData(insertData);
                }
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    uploadDocumentIntoDatabase(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('find data', data);
                exports.controller.insertDataInMongoDatabase(data); // Asynchronous task
                exports.controller.insertSynchronousData(data); // Synchronous task
                return;
            }
            catch (error) {
                throw error;
            }
        });
    }
    uploadFile(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.files) {
                console.log('request.files', request.files);
                response.send("File was not found");
                return;
            }
            console.log(request.files);
            exports.controller.uploadCsv(request.files.csvsheet.data);
            response.send("File is uploading it will take some time to complete the task,Thanku! ");
        });
    }
}
exports.controller = new Controller();
