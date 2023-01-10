import mysql from 'mysql';
import fs from 'fs';

//Database configuration
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'genderu_gamu'
  });

//Database Connection
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('Connected to database successfully !');
});

//Parse & store in db first 300 names if it's not done yet
db.query('SELECT * FROM `jeu`', (err, res) => {      
    if (res && res.length == 0) {
        let k = 0
        var list = fs.readFileSync('names.txt').toString().split("\n");
        for(let i  in list){
            var Prénoms = list[i].split(" ");
            if(k != 300){
                let post = {id : k+1, prénom: Prénoms[0]};
                let sql = 'INSERT INTO jeu SET ?';
                let query = db.query(sql, post);
                k++;
            }        
        }
    }
})

export default db;