const http = require('http');
const async = require('async');


const userId = 1;
const requestCount = 10000;
const subtractBalance = -2;

let requests = [];

// Build a large list of requests:
for (let i=0; i<requestCount; i++) {
    requests.push(function(callback){
        http.request({
            port: 3000,
            host: 'localhost',
            path: `/user/balance/${userId}/${subtractBalance}`
        },function(res){
            callback(null, res.statusCode);
        }).end()
    });
}

async.parallel(requests, function (err, results) {
    console.log(JSON.stringify(results));
});