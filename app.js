const express = require('express');
const port = 3001;
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
 
routes(app);
 
// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});