const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.use('/', function(req, res){
    res.send("Server is running fine");
})


app.listen(port, function(err){
    if (err) console.log(`Error in running the server: ${err}`); 
    else {
        console.log(`Server is running on port: ${port}`);
    }
});
