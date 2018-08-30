
console.log('JS loading: character.js');
//http://shrines.rpgclassics.com/snes/som/enemiesf.shtml

/**
 * Implémentée par Player et Enemy
 */
 var Character_Template = function(name, level, maxHealth, health, attack, defense) {
 	this.name = name;
 	this.level = level;
 	this.maxHealth = maxHealth;
 	this.health = health;
 	this.attack = attack;
 	this.defense = defense;
 }


/**
 * Une seule instanciation
 * @param {string} name
 * @param {integer} level
 * @param {integer} maxHealth
 * @param {integer} health
 * @param {integer} attack
 * @param {integer} defense
 * @param {string} weaponName
 * @param {string} armorName
 */
 var Player = function(name, level, maxHealth, health, attack, defense, weaponName, armorName) {
 	Character_Template.call(this, name, level, maxHealth, health, attack, defense);
 	this.currentXP = 0;
 	this.weaponName = weaponName;
 	this.armorName = armorName;
 	this.nextLevelsList = [];
 	this.move = function (dir) {
        var nextCoord = '';
        if (dir == 'up') {
            nextCoord = 1 * (player.positions.currentY - 1) + '-' + player.positions.currentX;
            if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
                player.positions.currentY--;
            }
        }
        else if (dir == 'right') {
            nextCoord = player.positions.currentY + '-' +  (1 * player.positions.currentX + 1);
            if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
                player.positions.currentX++;
            }
        }
        else if (dir == 'down') {
            nextCoord = 1 * (player.positions.currentY + 1) + '-' + player.positions.currentX;
            if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
                player.positions.currentY++;
            }
        }
        else if (dir == 'left') {
            nextCoord = player.positions.currentY + '-' + (1 * player.positions.currentX - 1);
            if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
                player.positions.currentX--;
            }
        }

        enterRoom(nextCoord);
        
    },
    this.positions = {
        startY: mazeSettings.height - 2,
        startX: Math.floor(mazeSettings.width / 2),
        nextY: 0,
        nextX: 0,
        currentY: mazeSettings.height - 2,
        currentX: Math.floor(mazeSettings.width / 2),
        lastY: 0,
        lastX: 0
    }
}

var player = null;
if (player_FromSession != null) {
    
    player = player_FromSession;
  
    
}
else {
    
    player = new Player('theName', 1, 100, 100, 10, 2, 'fists', 'shirt');
    
}




/**
 * Modèle pour Enemies
 * @param {string} name
 * @param {integer} level
 * @param {integer} maxHealth
 * @param {integer} health
 * @param {integer} attack
 * @param {integer} defense
 * @param {integer} givenXP
 * @param {items[]} possibleDrops
 * @param {integer} spawnRate
 * @param {string} imgName
 */
 var Enemy = function(name, level, maxHealth, health, attack, defense, givenXP, possibleDrops, spawnRate, imgName) {
 	Character_Template.call(this, name, level, maxHealth, health, attack, defense);
 	this.givenXP = givenXP;
 	this.possibleDrops = possibleDrops;
 	this.spawnRate = spawnRate;
 	this.imgName = imgName;
 }


 /* tous les ennemies */ 
 var obj_rabite = {
 	'name' : "rabite",
 	'level' : 1,
 	'maxHealth' : 22,
 	'health' : 22,
 	'attack' : 8,
 	'defense' : 1,
 	'givenXP' : 10,
 	'possibleDrops' : [],
 	'spawnRate' : 75,
 	'imgName' : "rabite.gif"
 }
 var obj_beastzombie = {
 	'name' : "beastzombie",
 	'level' : 1,
 	'maxHealth' : 22,
 	'health' : 22,
 	'attack' : 8,
 	'defense' : 1,
 	'givenXP' : 10,
 	'possibleDrops' : [],
 	'spawnRate' : 75,
 	'imgName' : "beastzombie.gif"
 }
 var obj_dinofish = {
 	'name' : "dinofish",
 	'level' : 1,
 	'maxHealth' : 22,
 	'health' : 22,
 	'attack' : 8,
 	'defense' : 1,
 	'givenXP' : 10,
 	'possibleDrops' : [],
 	'spawnRate' : 75,
 	'imgName' : "dinofish.gif"
 }

/* 
alimenter cette Map avec les nouveaux ennemies,
exemple avec rabite :
ALL_ENEMIES_TEMPLATES_BY_NAME.set(obj_rabite.name, obj_rabite);
*/
var ALL_ENEMIES_TEMPLATES_BY_NAME = new Map();
ALL_ENEMIES_TEMPLATES_BY_NAME.set(obj_rabite.name, obj_rabite);
ALL_ENEMIES_TEMPLATES_BY_NAME.set(obj_beastzombie.name, obj_beastzombie);
ALL_ENEMIES_TEMPLATES_BY_NAME.set(obj_dinofish.name, obj_dinofish);

/**
 * Enemy Factory
 * @param {string} enemyName
 * @return {Enemy} || {string} : message d'erreur
 * prend les infos dans la Map ALL_ENEMIES_TEMPLATES_BY_NAME avec le nom reçu
 */

 function createEnemy(enemyData) {
 	var standardLevel = ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).level;
 	createEnemy(enemyData, standardLevel);
 }
 function createEnemy(enemyData, enemyLevel) {
    
    enemyName = enemyData.name.toLowerCase();
    if (ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName) == undefined) {
       return 'No enemy by that name : "' + enemyName + '" in ALL_ENEMIES_TEMPLATES_BY_NAME.';
   }
   return new Enemy(
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).name,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).level,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).maxHealth,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).health,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).attack,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).defense,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).givenXP,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).possibleDrops,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).spawnRate,
       ALL_ENEMIES_TEMPLATES_BY_NAME.get(enemyName).imgName
       );
}







console.log('JS loaded: character.js');

