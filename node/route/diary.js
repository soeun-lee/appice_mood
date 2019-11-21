var mysql_dbc = require('../DB/db')();
var connection = mysql_dbc.init();

const diary = function(req, res){
    var content;

    req.on('data', function(data){ //data는 안드의 값. 아마 배열로 주지 않을까 싶은데..
        content = JSON.parse(data);
    });

    console.log(content);

    var sql = 'INSERT INTO calendar ?';
    connection.query(sql, content, function(err, results){
        if(err){
            console.log('오류: ' + err);
        }
    });
}

const show = function(req, res){
    var id = 1; //안드로이드에서 선택된 다이어리 id값 가져오기

    var sql = 'SELECT * FROM calendar WHERE = ?';
    connection.query(sql, id, function(err, results){
        if(err){
            console.log('오류: ' + err);
        }
        else{
            res.json(results);
        }
    });
}

const retouch = function(req, res){
    var id = 1; //안드로이드에서 선택된 다이어리 id값 가져오기


    var sql = 'UPDATE diary SET emoji_path=?, diary=? WHERE = ?';
    connection.query(sql, id, function(err, reuslts){
        if(err){
            console.log('오류: ' + err);
        }
    })
}

const erase = function(req, res){
    var id = 1; //안드로이드에서 선택된 다이어리 id값 가져오기

    var sql = 'DELETE FROM calendar WHERE = ?';
    connection.query(sql, id, function(err, results){
        if(err){
            console.log('오류: ' + err);
        }
    });
}

module.exports.diary = diary;
module.exports.show = show;
module.exports.retouch = retouch;
module.exports.erase = erase;