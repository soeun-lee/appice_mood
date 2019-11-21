var mysql_dbc = require('../DB/db')();
var connection = mysql_dbc.init()

const show_stat = function(req, res){ //한달동안의 positive, negative, soso를 불러와서 그걸 평균내서 json으로 안드에 보냄. 그리고... 그냥 쌩 데이터도 보냄. ㅎㅎ 이러면 끗!
    req.on('data', function(data){ 
        var content = JSON.parse(data);
     });
     var sql = 'SELECT * FROM stat WHERE year=?';
     connection.query(sql, content.year, function(err, results){
         if(err){
            console.log('오류: ' + err);
            res.json(err);
         }
         else{
            var average = (results.positive + results.negative + results.soso)/3;
            res.json(average, results.positive, results.negative, results.soso);
         }
     });
     connection.end();
}

module.exports.show_stat = show_stat;