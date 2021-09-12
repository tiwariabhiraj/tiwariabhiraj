const SERVER = {
    PORT: process.env['PORT']
}
const REDIS = {
    PORT: process.env['REDIS_PORT'],
    HOST: process.env['REDIS_HOST']

}
const ASSIGNED_WORK_TYPE = {
    UPLOAD_DOCUMENT: "UPLOAD_DOCUMENT"
}
const MONGO_CRED = {
    MONGO_DB_URL: process.env['MONGO_DB_URL']
}
const CPU_UT_TIMER = "CPU_UT_TIMER"
const COUNTER_AMT = 2 * 60

export {
    SERVER, ASSIGNED_WORK_TYPE, CPU_UT_TIMER, COUNTER_AMT, REDIS, MONGO_CRED
}