const { spawn } = require('child_process');
const path = require('path');
const { api, apiError } = require('../../../../helpers/format_response');
const ClientHealth = require('../../../../engine/models/client_health');


const postGetAnxietyPrediction = async (req, res) => {

    try {

        const input = req.body.input;

        const predict = new Promise((resolve, reject) => {
            const childMLPredict = spawn('python3', [path.join(__dirname, '../../../../../ML/anxiety/predict.py'), input]);
        
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

                    if (data == 1) clientHealth.mental_status.anxiety = true;
                    
                    else clientHealth.mental_status.anxiety = false;
                    
                    await clientHealth.save();

                    data = (data == 1) ? "Anxiety" : "Not anxiety";
                    return api("Success", res, data);

                })()
                
            })
            .catch(data => {
                return apiError(String(data), res, {}, 500);
            })

    } catch (e) {

        return apiError(String(e), res, {}, 500);
    }
}

module.exports = {
    postGetAnxietyPrediction
}