import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class GenericError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}
export default GenericError;
