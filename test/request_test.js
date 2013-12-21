var request = require('../request');

var opts = {
    host: 'isaacs.iriscouch.com',
    path: '/registry/_design/app/_view/npmTop?group_level=1',
    rejectUnauthorized: false,
    method: 'GET'
}

request(opts, function(e, buf){
    if(e)
        console.log(e.message);
    console.log(buf.toString());
})
