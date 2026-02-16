class ApiResponse {
    constructor(
        data= null,
        message = "Fetched resource",
        statusCode = 200,
    ) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data
    }
}

export default ApiResponse;