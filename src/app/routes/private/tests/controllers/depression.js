const { api, apiError } = require('../../../../helpers/format_response');
const { spawn } = require('child_process');
const path = require('path');


const postGetDepressionPrediction = async (req, res) => {

    try {

        const input = req.body.input;

        const predict = new Promise((resolve, reject) => {
            const childMLPredict = spawn('python3', [path.join(__dirname, '../../../../../ML/depression/predict.py'), input]);
        
            childMLPredict.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                resolve(data);
            })
            
            childMLPredict.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
                reject(data);
            })
            
            childMLPredict.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
            })
        })

        predict
            .then(data => {
                data = JSON.parse(data);
                console.log("Prediction is : ", (data == 1) ? "Depressed" : "Not depressed")
                data = (data == 1) ? "Depressed" : "Not depressed";
                return api("Success", res, data);
            })
            .catch(data => {
                console.log("Prediction failed", data);
                return apiError(String(data), res, {}, 400);
            })

    } catch (e) {

        return apiError(String(e), res, {}, 400);
    }
}

module.exports = {
    postGetDepressionPrediction
}