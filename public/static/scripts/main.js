var moment = require('moment');

var socket = io();

var app = new Vue({
    el: '#app',
    data: {
        tweets: [],
    },
    filters: {
        format: function(value) {
            var date = moment(value).format('MMM Do YY, h:mm:ss a');

            return date;
        },
        highlight: function(value) {
            var reg = /(RT) @\w+/g;

            if (reg.test(value)) {
                value = value.replace(reg, '<span>$&</span>');
            }

            return value;
        }
    },
    mounted: function (){
        socket.on('new tweet', function(tweet) {
            if (this.tweets.length > 4) {
                this.tweets.shift();
            }

            this.tweets.push(tweet);
        }.bind(this));
    }
});
