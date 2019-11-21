var mysql_dbc = require('../DB/db')();
var connection = mysql_dbc.init();

const diary = function(req, res){
    var content;
    
    req.on('data', function(data){ //data는 안드에서 주는 값.
    content = JSON.parse(data);
    });

    console.log(content);

    var sql = 'INSERT INTO calendar ?';
    connection.query(sql, content, function(err, results){
        if(err){
            console.log('오류: ' + err);
            res.json(err);
        }
        else{
            var moodNum = content.mood_num
            if(moodNum==1 || moodNum==8 || moodNum==11 || moodNum==12){
                sql = 'UPDATE stat SET positive = positive + 1 WHERE year= ?';
                connection.query(sql, content.year, function(err, results){
                    if(err){
                        console.log('오류: ' + err); 
                        res.json(err);
                    }
                })
            }
            else if(moodNum==2 || moodNum==5 || moodNum==9 || moodNum==10){
                sql = 'UPDATE stat SET negative = negative + 1 WHERE year= ?';
                connection.query(sql, content.year, function(err, results){
                    if(err){
                        console.log('오류: ' + err);
                        res.json(err);
                    }
                })
            }
            else{
                sql = 'UPDATE stat SET soso = soso + 1 WHERE year= ?';
                connection.query(sql, content.year, function(err, results){
                    if(err){
                        console.log('오류: ' + err);
                        res.json(err);
                    }
                })
            }
        }
    });
    connection.end();
}

const show = function(req, res){
    req.on('id', function(id){
       var db_id = JSON.parse(id);
    });

    var sql = 'SELECT * FROM calendar WHERE id = ?';
    connection.query(sql, db_id, function(err, results){
        if(err){
            console.log('오류: ' + err);
            res.json(err);
        }
        else{
            res.json(results); 
        }
    });
    connection.end();
}

const retouch = function(req, res){
    req.on('data', function(data){
       var content = JSON.parse(data); //바뀔 데이터 가져옴
    });

    var moodNum = content.mood_num;
    var sql = 'SELECT * FROM calendar WHERE id=?';
    connection.query(sql, content.id, function(err, results){
        if(err){
            console.log('오류: ' + err);
            res.json(err);
        }
        else{
            if(results.mood_num==1 || results.mood_num==8 || results.mood_num==11 || results.mood_num==12){ //1
                if(moodNum==1 || moodNum==8 || moodNum==11 || moodNum==12){//stat 변동사항 없음
                    sql = 'UPDATE diary SET emoji_path=?, diary=? WHERE id = ?';
                    connection.query(sql, content.emoji_path, content.diary, content.id, function(err, results){
                        if(err){
                            console.log('오류: ' + err);
                            res.json(err);
                        }
                    }); 
                }
                else if(moodNum==2 || moodNum==5 || moodNum==9 || moodNum==10){ //이밑으로는 stat 변동 있음 (negative일 경우)
                    sql = 'UPDATE stat SET positive = positive - 1 WHERE year= ?';
                    connection.query(sql, cotnent.year, function(err, results){
                        if(err){
                            console.log('오류: ' + err); 
                            res.json(err);
                        }
                        else{
                            sql = 'UPDATE stat SET negative = negative + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err); 
                                    res.json(err);
                                }
                            })
                        }
                    })
                }
                else{ //soso일 경우
                    sql = 'UPDATE stat SET positive = positive - 1 WHERE year= ?';
                    connection.query(sql, cotnent.year, function(err, results){
                        if(err){
                            console.log('오류: ' + err); 
                            res.json(err);
                        }
                        else{
                            sql = 'UPDATE stat SET soso = soso + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err); 
                                    res.json(err);
                                }
                            })
                        }
                    })
                }
            }
            else if(results.mood_num==2 || results.mood_num==5 || results.mood_num==9 || results.mood_num==10){ //2
                if(moodNum==2 || moodNum==5 || moodNum==9 || moodNum==10){ //stat 변동사항 없음
                    sql = 'UPDATE diary SET emoji_path=?, diary=? WHERE id = ?';
                    connection.query(sql, content.emoji_path, content.diary, content.id, function(err, results){
                    if(err){
                        console.log('오류: ' + err); 
                        res.json(err);
                        }
                    });
                }
                else if(moodNum==1 || moodNum==8 || moodNum==11 || moodNum==12){//이밑으로는 stat 변동 있음 (positive일 경우)
                    sql = 'UPDATE stat SET negative = negative - 1 WHERE year= ?';
                    connection.query(sql, cotnent.year, function(err, results){
                        if(err){
                            console.log('오류: ' + err); 
                            res.json(err);
                        }
                        else{
                            sql = 'UPDATE stat SET positive = positive + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err); 
                                    res.json(err);
                                }
                            })
                        }
                    })
                }
                else{//soso일 경우
                    sql = 'UPDATE stat SET negative = negative - 1 WHERE year= ?';
                    connection.query(sql, cotnent.year, function(err, results){
                        if(err){
                            console.log('오류: ' + err); 
                            res.json(err);
                        }
                        else{
                            sql = 'UPDATE stat SET soso = soso + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err); 
                                    res.json(err);
                                }
                            })
                        }
                    })
                }
            }
            else{ //3
                if(moodNum==3 || moodNum==4 || moodNum==6 || moodNum==7){ //stat 변동사항 없음
                    sql = 'UPDATE diary SET emoji_path=?, diary=? WHERE id = ?';
                    connection.query(sql, content.emoji_path, content.diary, content.id, function(err, results){
                    if(err){
                        console.log('오류: ' + err);
                        res.json(err);
                        }
                    });
                }
                else if(moodNum==1 || moodNum==8 || moodNum==11 || moodNum==12){//이밑으로는 stat 변동 있음 (positive일 경우)
                    sql = 'UPDATE stat SET negative = negative - 1 WHERE year= ?';
                    connection.query(sql, content.year, function(err, results){
                        if(err){
                            console.log('오류: ' + err);
                            res.json(err);                           
                        }
                        else{
                            sql = 'UPDATE stat SET positive = positive + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err);
                                    res.json(err);                           
                                }
                            })
                        }
                    })
                }
                else{ //negative일 경우
                    sql = 'UPDATE stat SET positive = positive - 1 WHERE year= ?';
                    connection.query(sql, content.year, function(err, reuslts){
                        if(err){
                            console.log('오류: ' + err);
                            res.json(err);                           
                        }
                        else{
                            sql = 'UPDATE stat SET negative = negative + 1 WHERE year= ?';
                            connection.query(sql, content.year, function(err, results){
                                if(err){
                                    console.log('오류: ' + err);
                                    res.json(err);                           
                                } 
                            })
                        }
                    })

                }                
            }
        }
    })
    connection.end();
}

const erase = function(req, res){
    req.on('data', function(data){
        var content = JSON.parse(data);
     });
    var sql = 'SELECT * FROM calendar WHERE id =?';
    connection.query(sql, content, function(err, results){
        var moodNum = results.mood_num;
        
        if(moodNum==1 || moodNum==8 || moodNum==11 || moodNum==12){
            sql = 'UPDATE stat SET positive = positive - 1 WHERE year= ?';
            connection.query(sql, content.year, function(err, results){
                if(err){
                    console.log('오류: ' + err); 
                    res.json(err);
                }
            })
        }
        else if(moodNum==2 || moodNum==5 || moodNum==9 || moodNum==10){
            sql = 'UPDATE stat SET negative = negative - 1 WHERE year= ?';
            connection.query(sql, content.year, function(err, results){
                if(err){
                    console.log('오류: ' + err); 
                    res.json(err);
                }
            })
        }
        else{
            sql = 'UPDATE stat SET soso = soso - 1 WHERE year= ?';
            connection.query(sql, content.year, function(err, results){
                if(err){
                    console.log('오류: ' + err); 
                    res.json(err);
                }
            })
        }
    });

     sql = 'DELETE FROM calendar WHERE id = ?';
    connection.query(sql, content.id, function(err, results){
        if(err){
            console.log('오류: ' + err);
            res.json(err);
        }
    });
    connection.end();
}

module.exports.diary = diary;
module.exports.show = show;
module.exports.retouch = retouch;
module.exports.erase = erase;