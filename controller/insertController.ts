import { view } from "../view/view"
import fs from "fs"
const reader = require('xlsx')
// const childP = require("./childProcess")
const path = require("path");
const { Worker, isMainThread, parentPort } = require('worker_threads');
let worker: any;

if (isMainThread) {

    const modulePath = path.resolve(__dirname, `uploadFile.js`);
    worker = new Worker(modulePath);
    worker.on('message', (message: any) => {
        console.log("Got a message from worker", message)
    });
    worker.on('exit', () => {
        console.log('Worker thread Exit');
    })
    // worker.postMessage('Hello, Abhishek!');
}
class Controller {

    fileupload = async (csvFile: any) => {
        new Promise((resolve, reject) => {
            fs.writeFileSync("test.xlsx", csvFile);
            resolve({});
        })
    }

    async assignToChildProcess(request: any, response: any) {
        await controller.fileupload(request.files.csvsheet.data)

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
    }

    async uploadCsv(csvBufferData?: any) {
        try {
            // console.log('csvBufferData', csvBufferData);
            console.log('processId==',process.pid);
            // await controller.fileupload(csvBufferData)
            const file = reader.readFile('./test.xlsx')
            // fs.unlink('./test.xlsx', (err: any) => {
            //     if (err) throw err;
            //     console.log("csv file deleted successfully");
            // });
            let data: any = []
            const sheets = file.SheetNames
            for (let i = 0; i < sheets.length; i++) {
                const temp = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
                temp.forEach((response: any) => {
                    data.push(response)
                })
            }
            console.log(data[0]);

            await controller.uploadDocumentIntoDatabase(data)
            return
        } catch (error) {
            throw error;
        }
    }

    async insertDataInMongoDatabase(data: any) {
        return new Promise(async (resolve, reject) => {
            Promise.all([
                view.insertAccountData(data),
                view.insertAgentData(data),
                view.insertpolicyCategoryData(data),
            ]).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    async insertUserAndCompanyData(data: any) {
        return new Promise(async (resolve, reject) => {
            Promise.all([
                view.insertUserData(data),
                view.insertPolicyCarrierData(data),
            ]).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    async insertSynchronousData(data: any) {
        try {
            let insertedData: any
            for (let insertData of data) {
                insertedData = await controller.insertUserAndCompanyData(insertData);
                insertData['userId'] = insertedData[0]._id;
                insertData['company_id'] = insertedData[1]._id;
                view.insertPolicyInfoData(insertData);
            }
            return
        } catch (error) {
            throw error
        }
    }

    async uploadDocumentIntoDatabase(data: any) {
        try {
            console.log('find data', data);

            controller.insertDataInMongoDatabase(data);  // Asynchronous task
            controller.insertSynchronousData(data) // Synchronous task
            return;
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(request: any, response: any) {
        if (!request.files) {
            console.log('request.files', request.files);
            response.send("File was not found");
            return;
        }
        console.log(request.files);
        controller.uploadCsv(request.files.csvsheet.data);
        response.send("File is uploading it will take some time to complete the task,Thanku! ");
    }


}
export const controller = new Controller()