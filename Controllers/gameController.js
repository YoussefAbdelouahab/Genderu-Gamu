import Game from '../Models/gameModel.js'
import GenderApi from 'gender-api.com-client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + '/../';


const getName = async(req, res) => {
    try {
        const game = await Game.findOne((err, result) =>{
            if(err){
                console.log(err);
            }else{
                //Récupérer le prénom
                var response = result.res;
                var prénom = response[0].prénom
                //Récupérer le genre du prénom
                var genderApiClient = new GenderApi.Client('snRkVbdkV558sKrBLgBctTYaSjgt89ASofZP');
                genderApiClient.getByFirstName(prénom, function (response) {
                    var genre = response.gender;
                    //Renvoyer la page html avec les variable name et gender
                    res.render(path.join(__dirname + 'Views', 'GamePage.html'), {name: prénom, gender: genre});
                });
            }
        });
    }catch(error) {
        console.log(error);
        next(error)
    }
}
export default {getName};