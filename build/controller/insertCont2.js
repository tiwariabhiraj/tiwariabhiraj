"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fileUpload = /** @class */ (function () {
    function fileUpload(child_Process) {
        fileUpload.init();
    }
    fileUpload.init = function () {
        try {
            process.on('message', function (request) {
                // if (request.type == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                //     controller.uploadCsv(request.data)
                // }
            });
        }
        catch (error) {
            throw error;
        }
    };
    return fileUpload;
}());
