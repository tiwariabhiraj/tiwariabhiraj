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
const express = require('express');
const app = express();
require('dotenv').config();
const redis = require("redis");
const startWorker_1 = require("./workerThread/startWorker");
const redis_1 = require("./redis");
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const connect_1 = require("./DatabaseConnection/connect");
const route_1 = require("./route/route");
app.use(express.json());
app.use('/user', route_1.Router);
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield new connect_1.ConnectToDatabase(); // connect database
    new redis_1.RedisClient(redis); // connect redis
    new startWorker_1.WorkerThreads(process, app); // start worker threads
    // new UploadFile()
});
// app.listen(7000)
init();
