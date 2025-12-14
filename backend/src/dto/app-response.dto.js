import {HttpStatus} from '../utils/httpStatusText.js'

export const AppResponse = (status, message, data) => {
    if (status === HttpStatus.SUCCESS) {
        return {status, data};
    } else if (status === HttpStatus.FAIL) {
        return {status, message, data};
    } else {
        return {status, message};
    }
};
