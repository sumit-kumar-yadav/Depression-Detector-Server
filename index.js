const express = require('express');
const { spawn } = require('child_process');
const path = require('path');



const app = express();
const port = process.env.PORT || 8000;

// app.use('/', function(req, res){
//     res.send("Server is running fine");
// })

app.use('/', function(req, res){
    // Predict the data
    const childMLPredict = spawn('python', [path.join(__dirname, './src/ML/predict.py'), 'Sumit']);

    childMLPredict.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    })
    
    childMLPredict.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    })
    
    childMLPredict.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    })
})

app.listen(port, function(err){
    if (err) console.log(`Error in running the server: ${err}`); 
    else {
        // Train the machine learning model
        const childModelPrep = spawn('python', [path.join(__dirname, './src/ML/model.py'), 'Sumit']);

        childModelPrep.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        })
        
        childModelPrep.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        })
        
        childModelPrep.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        })

        console.log(`Server is running on port: ${port}`);

    }
});
