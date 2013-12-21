var request = require('./request');

module.exports = function (cb) {
    getScores(function (err, scores) {
        if (err) return cb(err);
        
        var total = Object.keys(scores).reduce(function (sum, name) {
            return sum + scores[name];
        }, 0);
        
        var sorted = Object.keys(scores)
            .sort(function (a,b) {
                return (scores[b] - scores[a])
                    || (a.toLowerCase() < b.toLowerCase() ? -1 : 1)
                ;
            })
            .map(function (name, ix) {
                return {
                    rank : ix + 1,
                    percent : 100 * scores[name] / total,
                    packages : scores[name],
                    author : name,
                };
            })
        ;
        cb(null, sorted);
    });
};

function getScores (cb) {
    var opts = {
        host: 'isaacs.iriscouch.com',
        path: '/registry/_design/app/_view/npmTop?group_level=1',
        rejectUnauthorized: false,
        method: 'GET'
    }
    request(opts, function (err, buf) {
        if (err) return cb(err);
        
        var data = JSON.parse(buf.toString());
        
        var scores = data.rows.reduce(function (acc, row) {
            acc[row.key] = row.value;
            return acc;
        }, {});
        cb(null, scores);
    });
}
