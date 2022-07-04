import express from 'express';
import bodyParser from 'body-parser';
import gameRoute from './Routes/gameRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/Public'));

const PORT = 4000;
app.use(bodyParser.json());


//Routes
app.get('/', function (req, res) {
    var options = {root: path.join('./Views')};
    var fileView = 'HomePage.html';
    res.sendFile(fileView, options)
});
app.use('/game', gameRoute,);

app.listen(PORT, () => console.log(`Server Started on port: http://localhost:${PORT}`));