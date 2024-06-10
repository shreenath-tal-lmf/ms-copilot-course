// create web server 

// 1. load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// 2. create server
http.createServer(function(request, response) {
	// 3. parse request
	var pathname = url.parse(request.url).pathname;
	
	// 4. read file
	fs.readFile(path.join(__dirname, pathname), function(err, data) {
		if (err) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end('<h1>404 Not Found</h1>');
		} else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		}
	});
}).listen(52273, function() {
	console.log('Server Running at http://
