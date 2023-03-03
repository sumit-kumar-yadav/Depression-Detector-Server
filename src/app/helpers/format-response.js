
module.exports.api = async (message, res, data) => {

    let response = {};

    response.error = false;
    response.message = message;
    response.status = 200;
    response.body = data;

    return res.status(200).json(response);
}

module.exports.apiError = async (message, res, data, status = 406) => {

    let response = {};

    response.error = true;
    response.message = message;
    response.status = status;
    response.body = data;

    return res.status(status).json(response);
}