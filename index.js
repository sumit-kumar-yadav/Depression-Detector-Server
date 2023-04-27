const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

// Connect to MongoBD database
const db = require('./src/app/engine/config/mongoose');

// Api route 
const apiRoute = require('./src/app/routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(logger('dev'));

app.use(cors())

// Express parser to parse the json data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Root route 
app.get('/', function(req, res){
    res.send("Server is running fine");
})

app.use('/api', apiRoute);

app.listen(port, function(err){
    if (err) console.log(`Error in running the server: ${err}`); 
    else {
        console.log(`Server is running on port: ${port}`);
        
        // Train the machine learning model (command --> npm run dev)
        if(process.argv[2] == 'train'){
            console.log("Please wait... Model is being trained");
            trainModel();
        }

    }
});

function trainModel(){

    const childModelPrep = spawn('python3', [path.join(__dirname, './src/ML/model.py'), 'Sumit']);

    childModelPrep.stdout.on('data', (data) => {
        console.log(`stdout: Training is completed. Accuracy is ${data}`);
    })
    
    childModelPrep.stderr.on('data', (data) => {
        console.log("Error while training the model");
        console.error(`stderr: ${data}`);
    })
    
    childModelPrep.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    })
    
}
