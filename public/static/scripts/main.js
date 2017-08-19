var socket = io();

var app = new Vue({
    el: '#app',
    data: {
        tweets: [],
    },
    mounted: function (){
        socket.on('new tweet', function(tweet) {
            this.tweets.push(tweet);
        }.bind(this));
    }
});
