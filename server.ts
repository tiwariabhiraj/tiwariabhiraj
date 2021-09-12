const express = require('express');
const app = express();
require('dotenv').config();
const redis = require("redis");

import { WorkerThreads } from "./workerThread/startWorker";
import { RedisClient } from "./redis";
const fileUpload = require("express-fileupload");
import { UploadFile } from "./controller/uploadFile"
app.use(fileUpload());
import { ConnectToDatabase } from "./DatabaseConnection/connect";
import { Router } from "./route/route";
app.use(express.json());
app.use('/user', Router);
const init = async () => {

    await new ConnectToDatabase();   // connect database
    new RedisClient(redis);              // connect redis
    new WorkerThreads(process, app); // start worker threads
    // new UploadFile()
}
// app.listen(7000)
init();








