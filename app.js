var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var io      = require('socket.io')(server);

var TwitterStream = require('twitter-stream-api');

// Port
server.listen(8080);

// Express configuration
app.use(express.static('public/static'));

// Routes
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

// Twitter
var keys = {
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: ''
});

// Socket
io.on('connection', function(socket) {
    Twitter.on('data', function(tweet) {
        socket.emit('new tweet', JSON.parse(tweet.toString()));
    });
});
