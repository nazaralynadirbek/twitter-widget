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
    consumer_key: '57YQm5EmhO7qJpsSjofIKhlwe',
    consumer_secret: 'mIyRRpfKJgVzkDbb2i0PmoLqkPUGaS0CgMSdmOT5VUsDJzCBOH',
    token: '898905100932009984-9aCvImgECSaUGLFMQqL36rVUNAUTm3v',
    token_secret: '2x7EeSSJT966rkaQnYcW7Bu830vk6AZcH6om1UdxMKk6H'
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'barselona'
});

// Socket
io.on('connection', function(socket) {
    Twitter.on('data', function(tweet) {
        socket.emit('new tweet', JSON.parse(tweet.toString()));
    });
});
