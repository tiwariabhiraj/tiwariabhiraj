"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UploadFile = /** @class */ (function () {
    function UploadFile() {
        UploadFile.uploadFile();
    }
    UploadFile.uploadFile = function () {
        try {
            process.on('message', function (data) {
                console.log('data==', data);
                // controller.uploadCsv(new Buffer(data.data.data))
            });
        }
        catch (error) {
            throw error;
        }
    };
    return UploadFile;
}());
new UploadFile();
