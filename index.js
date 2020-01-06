
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


// 1 - Build Node Server with Express framework/package
const express = require('express');
const http = require('http');

// HTTP request logger middleware for node.js
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

// serve static files
app.use(express.static(__dirname + '/public'));

// if request for non-existent route, default will serve the default value
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
