const wrapResponse = {
    success: (statusCode, result) => {
        return ({
            statusCode,
            result,
            status: 'success'
        });
    },
    
    error: (statusCode, message) => {
        return ({
            statusCode,
            message,
            status: 'error'
        });
    }

}

export default wrapResponse;
