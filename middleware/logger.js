var winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
var path = require('path');
var API_logPath = __dirname + "/../logs/";

const logformat = winston.format.combine(
    winston.format.align(),

    winston.format.timestamp({ format: 'DD-MM-YYYY T hh:mm:ss.sss A' }),
    winston.format.printf(({ level, message, timestamp, label }) => {
        return `[ ${level.toUpperCase()} | ${timestamp} | LOG:${message} ]`;
    }))



const errorLog = winston.createLogger({
    transports: [
        new DailyRotateFile({
            filename: path.join(API_logPath, 'API_data_%DATE%.log'),
            format: logformat,
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            maxSize: '10m',
            maxFiles: '14d',
            prepend: true,

        })
    ]
});


const accessLog = winston.createLogger({

    transports: [
        new DailyRotateFile({
            filename: path.join(API_logPath, 'API_data_%DATE%.log'),
            format: logformat,
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            maxSize: '10m',
            maxFiles: '14d',
            prepend: true,

        })
    ]
});

module.exports = { errorLog: errorLog, accessLog: accessLog };
