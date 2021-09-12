const { parentPort, receiveMessageOnPort, isMainThread } = require('worker_threads');
import { controller } from "./insertController"
let array = []
parentPort.on('message', (data: any) => {
    // let correctData=Buffer.from(data)
    console.log('I got Pinged', data);
    array.push(data)
    console.log();
    controller.uploadCsv()

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
})

export class UploadFile {
    constructor() {
        UploadFile.uploadFile()
    }
    static uploadFile() {
        try {
            process.on('message', (data: any) => {
                console.log('data for request', Buffer.from(data.data));
                controller.uploadCsv(Buffer.from(data.data.data))
            })
        } catch (error) {
            throw error
        }
    }
}
