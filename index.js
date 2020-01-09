const express = require('express');
const http = require('http');
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json())  // allows us to extract the body of the request message in JSON format. 
                            // when we use the body parser, what happens is that for the incoming request, 
                            // the body of the incoming request will be parsed and then added into the 'req' object as req.body. 
                            // So the req.body will give you access to whatever is inside that body of the message

/* req.query, req.params and req.body 

    req.query comes from query parameters in the URL such as http://foo.com/somePath?name=ted 
    where req.query.name === "ted".

    req.params comes from path segments of the URL that match a parameter in the route definition 
    such as /song/:songid. So, with a route using that designation and a URL such as /song/48586, 
    then req.params.songid === "48586".

    req.body properties come from a form post where the form data (which is submitted in the body contents) 
    has been parsed into properties of the body tag.
*/

app.use('/dishes', dishRouter); // mount the dishRouter, any request to /dishes will be handled by dishRouter
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use(express.static(__dirname + '/public')); // serve static files

app.use((req, res, next) => { // if request for non-existent route, server will serve the default value
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
