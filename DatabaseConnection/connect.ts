const mongoose = require('mongoose');
import { MONGO_CRED } from "../constant/constant"
import { messageController } from "../controller/messageController"
export class ConnectToDatabase {
    constructor() {
        this.DatabaseConnected()
    }
    async DatabaseConnected() {
        try {
            await mongoose.connect(MONGO_CRED.MONGO_DB_URL)
            console.log('******Database successfully connected******');
            ConnectToDatabase.recoverScheduledMessage()
            return
        } catch (error) {
            throw error
        }
    }

    static recoverScheduledMessage() {
        try {
            messageController.sendTempMessageToPermanentMessage()
            return
        } catch (error) {
            throw error
        }
    }

}
