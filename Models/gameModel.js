import db from '../Config/dbConfig.js'
class Game {
    constructor(id, prénom){
        this.id = id;
        this.prénom = prénom;
    }
    static findOne(callback){   
        db.query('SELECT prénom FROM `jeu` ORDER BY RAND() LIMIT 1', (err, res) => {
            callback(null, {res: res});
        });
    }
}

export default Game;
