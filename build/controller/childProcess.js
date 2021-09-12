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
const { fork } = require('child_process');
const path = require("path");
const modulePath = path.resolve(__dirname, `uploadFile`);
const constant = require("../constant/constant");
const child_process = fork(modulePath);
// console.log('__dirname', __dirname);
class FileUpload {
    constructor() { }
    SendJobToChildProcess(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('data in childprocess', data);
                child_process.send({ type: "UPLOAD_DOCUMENT", data: data });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const fileupload = new FileUpload();
module.exports = fileupload;
