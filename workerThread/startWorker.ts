
const cluster = require('cluster');
import { SERVER, ASSIGNED_WORK_TYPE } from "../constant/constant";
const totalCPUs = require('os').cpus().length;
import { controller } from "../controller/insertController"
export var mainWorker: any
export class WorkerThreads {
    public process: any
    public app: any

    constructor(process: any, app: any) {
        this.process = process;
        this.app = app;
        this.startServer(this.process, this.app)
    }

    async startServer(process: any, app: any) {
        try {


            if (cluster.isMaster) {
                const worker = cluster.fork();
                worker.on("message", (data: any) => {
                    console.log('got message here',data);
                    
                    if (data && data.taskType == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                        console.log("ddddddddddddddddddddd");
                        controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                    }
                });
                // for (let i = 0; i < totalCPUs; i++) {
                //     if (i == 0) {
                //         mainWorker = cluster.fork();
                //         mainWorker.on('message', (data: any) => {
                //             if (data && data.taskType == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                //                 console.log("ddddddddddddddddddddd");
                //                 controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                //             }
                //         })
                //     } else {
                //         let worker = cluster.fork();

                //         worker.on('message', (data: any) => {
                //             if (data && data.taskType == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
                //                 controller.uploadCsv(Buffer.from(data.doc.csvsheet.data.data));
                //             }
                //         })
                //     }

                // }

                // cluster.on('exit', (worker: any, code: any, signal: any) => {
                //     cluster.fork();
                // });
            } else {
                app.listen(SERVER.PORT, () => {
                    console.log(`App listening on port ${SERVER.PORT}`);
                })
            }
        } catch (error) {
            throw error
        }

    }
}
