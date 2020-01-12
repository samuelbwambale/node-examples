
// // 1 - Build Node Server without Express

// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const hostname = 'localhost';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     console.log('Request for ' + req.url + ' by method ' + req.method);

//     if (req.method == 'GET') {
//       let fileUrl;
//       if (req.url == '/') fileUrl = '/index.html';
//       else fileUrl = req.url;

//       let filePath = path.resolve('./public'+fileUrl);
//       const fileExt = path.extname(filePath);
//       if (fileExt == '.html') {
//         fs.exists(filePath, (exists) => {
//           if (!exists) {
//             res.statusCode = 404;
//             res.setHeader('Content-Type', 'text/html');
//             res.end('<html><body><h1>Error 404: ' + fileUrl + 
//                         ' not found</h1></body></html>');
//             return;
//           }
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'text/html');
//           fs.createReadStream(filePath).pipe(res);
//         });
//       }
//       else { // if file is not an html file
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1>Error 404: ' + fileUrl + 
//                 ' not a HTML file</h1></body></html>');
//       }
//     }
//     else { // if HTTP method is not a GET
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/html');
//         res.end('<html><body><h1>Error 404: ' + req.method + 
//                 ' not supported</h1></body></html>');
//     }
//   })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


// 2 - Build Node Server with Express framework/package
const express = require('express');
const http = require('http');
const morgan = require('morgan'); // HTTP request logger middleware for node.js
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3001;

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

const mongoose = require('mongoose')
const Dishes = require('./models/dishes')

const url = 'mongodb://localhost:27017/acme';
const connect = mongoose.connect(url, { useNewUrlParser: true });
connect.then((db) => {
  console.log('Connected correctly to Server');

  Dishes.create({
    name: 'New Dishes',
    description: 'test'
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(dish._id, {
        $set: { description: 'Updated test' }
      }, {
        new: true
      })
        .exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: 'I\'m getting a sinking feeling!',
        author: 'Leonardo di Carpaccio'
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.deleteMany({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
})

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
