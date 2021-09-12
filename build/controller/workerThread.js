"use strict";
// const { parentPort, receiveMessageOnPort, isMainThread } = require('worker_threads');
// parentPort.on('message', (data:any) => {
//     // console.log('Worker thread got data:', data);
//     // function workerThreadFunction() {
//     //     for (let i = 0; i < 100000; i++) {
//     //         console.log('workerThread', i);
//     //     }
//     //     console.log('DONE!!!!');
//     //     return;
//     // }
//     // workerThreadFunction()
// })
// if (!isMainThread) {
//     parentPort.postMessage("worker thread running")
// }
// class FileUpload {
//     constructor() { }
//     async SendJobToChildProcess(data: any) {
//         try {
//             console.log('data in childprocess', data);
//             child_process.send({ type: "UPLOAD_DOCUMENT", data: data })
//         } catch (error) {
//             throw error
//         }
//     }
// }
// const fileupload = new FileUpload()
// module.exports = fileupload
