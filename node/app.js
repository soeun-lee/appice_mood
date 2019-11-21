const http = require('http'),
    express = require('express');

var mysql_dbc = require('./DB/db')();
var connection = mysql_dbc.init();

const con_route = require('./route/diary');
const stat_route = require('./route/stat');

const app = express();

app.use(function(){
    var sql = 'SELECT * FROM calendar';
    connection.query(sql, function(err, results){
        if(err){
            console.log('에러 : ' + err);
            res.json(err);
        }
        else{
            res.json(results);
        }
    });
});

app.set('port', process.env.PORT || 3000);

var router = express.Router();
    router.route('/diary', con_route.diary);
    router.route('/show', con_route.show);
    router.route('/retouch', con_route.retouch);
    router.route('/delete', con_route.erase);

    router.route('./show/stat', stat_route.show_stat);
app.use('/', router);

http.createServer(app).listen(app.get('port'), function(req, res){
    console.log('서버시작, 포트: %s', app.get('port'));
});
