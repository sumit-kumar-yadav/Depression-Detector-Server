const { spawn } = require('child_process');
const path = require('path');
const { api, apiError } = require('../../../../helpers/format_response');
const ClientHealth = require('../../../../engine/models/client_health');


const postGetStressPrediction = async (req, res) => {

    try {

        const input = req.body.input;

        const predict = new Promise((resolve, reject) => {
            const childMLPredict = spawn('python3', [path.join(__dirname, '../../../../../ML/stress/predict.py'), input]);
        
            childMLPredict.stdout.on('data', (data) => {
                resolve(data);
            })
            
            childMLPredict.stderr.on('data', (data) => {
                reject(data);
            })
            
            childMLPredict.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
            })
        })

        predict
            .then(data => {
                data = JSON.parse(data);

                (async () => {
                    let clientHealth = await ClientHealth.findOne({user: req.user._id});

                    if(!clientHealth) 
                        throw "First create your details.";

                    if (data == 1) clientHealth.mental_status.stress = true;
                    
                    else clientHealth.mental_status.stress = false;
                    
                    await clientHealth.save();
                })()

                data = (data == 1) ? "Stressed" : "Not stressed";
                return api("Success", res, data);
            })
            .catch(data => {
                return apiError(String(data), res, {}, 500);
            })

    } catch (e) {

        return apiError(String(e), res, {}, 500);
    }
}

module.exports = {
    postGetStressPrediction
}