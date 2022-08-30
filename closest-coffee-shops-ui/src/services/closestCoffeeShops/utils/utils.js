/** @const {String} ERROR_TOKEN Constant token used to mark that the operation failed */
export const ERROR_TOKEN = "ERROR";

/** @const {String} RETRIEVE_ALL_TOKEN Constant token used to mark that we want to retrieve all coffee shops */
export const RETRIEVE_ALL_TOKEN = "RETRIEVE_ALL";

/**
 * Creates the standard returned response in case of operation failure
 * 
 * @param {Number} errorCode The error code to be included in the response
 * @returns An array containing the ERROR_TOKEN and the error code
 */
export function errorResponse(errorCode) {
    return [ERROR_TOKEN, errorCode];
}
