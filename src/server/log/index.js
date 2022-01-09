const requestLogger = (req, res, next) => {
    console.log(`REQUEST ${req.method}: Url: ${req.originalUrl} ${req.method !== 'GET' ? `, BODY: ${JSON.stringify(req.body)}` : ''}`);
    next();
}

const appLog = (msg) => {
    console.log(msg);
}

module.exports = {
    requestLogger,
    appLog
}