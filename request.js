var https = require('https');

module.exports = function request(opts, cbk){
    var req = https.request(opts, function(res){

        var chunks = [];
        var size = 0;
        res.on('data', function(d){
            chunks.push(d);
            size += d.length;
        });

        res.on('end', function(){
            var buf = Buffer.concat(chunks, size);
            cbk(null, buf);
        })
    });

    req.end();

    req.on('error', function(e){
        cbk(e);
    });
}