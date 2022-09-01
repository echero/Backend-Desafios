const winston = require('winston')

const createLogger = (env) => {
    if (env === 'PROD'){
      return winston.createLogger({
        transports: [
          new winston.transports.File({filename: './logs/errors.log', level:"error", timestamp: new Date().toLocaleString()}),
          new winston.transports.File({filename: './logs/warning.log', level: "warn", timestamp: new Date().toLocaleString()}),
          new winston.transports.Console()
        ]
      })
    }else{
      return winston.createLogger({
        transports: [
            new winston.transports.File({filename: './logs/errors.log', level:"error", timestamp: new Date().toLocaleString()}),
            new winston.transports.File({filename: './logs/warning.log', level: "warn", timestamp: new Date().toLocaleString()}),
            new winston.transports.Console()
        ]
     })
    }
}

module.exports = {createLogger}