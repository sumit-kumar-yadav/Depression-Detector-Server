// Cloud DB
const mongoose = require('mongoose');
const env = require('./env');

mongoose
  .connect(env.mongodbAtlasUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB cloud');
  })
  .catch((err) => {
    console.log(err);
  });



//   // Local DB
// const mongoose = require('mongoose');
// const env = require('./env');

// mongoose.connect(`mongodb://localhost/${env.db}`, {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// db.once('open', function(){
//     console.log('Connected to Database :: MongoDB');
// });


// module.exports = db;