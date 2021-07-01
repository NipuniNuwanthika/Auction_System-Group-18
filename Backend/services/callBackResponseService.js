const log4js = require('log4js');

const logger = log4js.getLogger('callback');

module.exports = {
    callbackWithData(data, total){
        return {
            status:true,
            data:data,
            total:total,
        }
    },
    callbackWithSucessMessage(message){
        return {
            status:true,
            data:message
        }
    },
    callbackWithfalseMessage(message){
        return {
            status:false,
            data:message
        }
    },
    callbackWithfalseMessageAndStatus(message){
        return {
            status:false,
            data:message,
            statusOf: true
        }
    },
    callbackWithDefaultError(error){
        logger.error(`Query Error!!\n ${error}`);

        return {
            status:false,
            data:"Unkown Error"
        }
    }
}