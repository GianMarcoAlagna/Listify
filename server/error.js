function createError(err, status, msg, file, method) {
    const error = {
        status: status,
        log: `Error in ${file}: method -> ${method}, Error: ${err}`,
        status: status,
        message: {error: msg}
    }
    return error;
}

module.exports = createError;