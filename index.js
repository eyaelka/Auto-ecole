const express = require('express'); 
const app = express();
const router = express.Router();


const mongoose = require('mongoose');
const path = require ('path');
const authentication = require ('./routes/authentication')(router);
const forum = require ('./routes/forum')(router);
const event = require ('./routes/event')(router);
const bodyParser = require ('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/autoecole', 
{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex: true, useNewUrlParser: true})
.then(()=>{ return console.log("Connected to MongoDB Localhost...");
 })
.catch(err => console.log("Could not connect",err))



app.use(cors({ origin: 'http://localhost:4200' })); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/frontend/dist/'));
app.use('/authentication', authentication);
app.use('/forum', forum);
app.use('/event',event);


app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/frontend/dist/frontend/index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});