# Genderu Gameru

Genderu Gamu est un petit jeu, il consiste à deviner le genre d'un prénom qui s'affiche à l'écran.

---
## Prérequis

Pour l'installation des dépendances, il va falloir `nodejs` et le gestionnaire de paquet `npm`.

### Node 

- #### Node installation sur Windows
Allez simplement sur le [site officiel de Node.js](https://nodejs.org/) et téléchargez le programme d'installation.

- #### Node installation sur Linux
Vous pouvez installer nodejs et npm facilement avec apt install, exécutez simplement les commandes suivantes.

    $ sudo apt install nodejs
    $ sudo apt install npm

Si l'installation a réussi, vous devriez pouvoir exécuter la commande suivante.

    $ node --version
    v16.15.1

    $npm --version
    8.11.0
### Base de donnée (Utilisation de Wamp conseillé)

- Créez une base de données avec le nom 'genderu_gamu' : `CREATE DATABASE genderu_gamu;`.
- Créez une table avec le nom 'jeu' avec deux colonnes 'id' et 'prénom' : ``CREATE TABLE `genderu_gamu`.`jeu` ( `id` INT NOT NULL AUTO_INCREMENT , `prénom` VARCHAR(250) NOT NULL , PRIMARY KEY (`id`))``.
---
## Installation
    $ git clone https://github.com/YoussefAbdelouahab/Genderu-Gamu.git
    $ cd Genderu-Gamu
    $ npm install

## Configuration de l'application
- Ouvrez le fichier `/Config/dbConfig.js` et modifiez si besoin les lignes 6 7 8 et 9.

   `host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'genderu_gamu'`

- Créez-vous un compte sur le [site officiel de Gender Api](https://gender-api.com/fr/account/login) dans la section [mon compte](https://gender-api.com/fr/account/overview) vous trouverez votre clé api copiez là et entrez là dans `/Controllers/gameController.js` ligne 20 `var genderApiClient = new GenderApi.Client('ma_clé_api');`

## Lancer l'application
    $npm start
---
## Fonctionnement Technique
- Lorsque l'application se lance elle vérifie si la table `jeu` de la base de données est vide si elle l'est elle va entrer les 300 premiers prénoms du fichier names.txt à la suite.

- Lorsque l'url `http://localhost:4000/` est appellée une page html est appellée et rien d'autre.

- Lorsque l'url `http://localhost:4000/page` est appellée deux requêtes sont faites : 

    - Une requête à la base de donnée pour récupérer un prénom aléatoirement : ``SELECT prénom FROM `jeu` ORDER BY RAND() LIMIT 1``.
    - Une requête à l'api `Gender Api` pour récupérer le genre du prénom : `genderApiClient.getByFirstName(prénom)`.

- Une fois les deux variables 'prénom' et 'genre' récupérées elles sont envoyées à la page html :  `res.render(path.join(__dirname + 'Views', 'GamePage.html'), {name: prénom, gender: genre});`.

- Lorsque la page `http://localhost:4000/page` est chargée l'utilisateur se voit attribuer une variable pv initialisée à 10 et stocker dans le localStorage : 

    `var pv = 10;`

    `if(localStorage.getItem("pv") == null){
		localStorage.setItem("pv", 10);
	}`.

- Lorsque le bouton féminin ou masculin est clické il appelle une fonction qui va récupérer les points de vie les modifier et les restocker dans le localStorage :

    `onclick="jeu('female')"` 

    `onclick="jeu('male')"`.

---
## Amélioration possible

- Optimiser la function qui gère les pv , il y a trop d'appel au LocalStorage.
- Coder autrement le modèle de telle sorte que je n'ai pas à devoir faire plusieurs variables pour récupérer une donnée.
- Coder un peu plus proprement le css, faire 3 css un pour les deux pages un pour la page d'acceuil et un pour la page de jeu.

### Temps de développement
L'application m'a pris `8 heures` de développement, ayant toujours fait des projet nodejs en utilisant mongodb comme base de donnée il ma fallu un peu de temps pour comprendre comment fonctionne node js avec MySQL.