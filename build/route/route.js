"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express = require('express');
const router = express.Router();
const insertController_1 = require("../controller/insertController");
const searchController_1 = require("../controller/searchController");
const messageController_1 = require("../controller/messageController");
// router.post("/upload-excel", controller.uploadCsv);
router.get("/search", searchController_1.searchController.search);
router.get("/policy-info", searchController_1.searchController.aggregatePolicyOfUser);
// router.post('/upload', controller.uploadFile)
router.post('/upload', insertController_1.controller.assignToChildProcess);
router.post('/message', messageController_1.messageController.saveMessage);
exports.Router = router;
