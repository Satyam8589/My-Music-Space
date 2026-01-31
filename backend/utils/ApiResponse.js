export class ApiResponse {
    constructor(statusCode, message, data = null) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        if (data) {
            this.data = data;
        }
    }
}