
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
 	this.currentXP = currentXP;
 	this.weaponName = weaponName;
 	this.armorName = armorName;
 	this.nextLevelsList = [];
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
 	.gif
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
ALL_ENEMIES_OBJ.set(obj_rabite.name, obj_rabite);
*/
var ALL_ENEMIES_OBJ = new Map();
ALL_ENEMIES_OBJ.set(obj_rabite.name, obj_rabite);
ALL_ENEMIES_OBJ.set(obj_beastzombie.name, obj_beastzombie);
ALL_ENEMIES_OBJ.set(obj_dinofish.name, obj_dinofish);

/**
 * Enemy Factory
 * @param {string} enemyName
 * @return {Enemy} || {string} : message d'erreur
 * prend les infos dans la Map ALL_ENEMIES_OBJ avec le nom reçu
 */
 function createEnemy(enemyName) {
 	enemyName = enemyName.toLowerCase();
 	if (ALL_ENEMIES_OBJ.get(enemyName) == undefined) {
 		return 'No enemy by that name : "' + enemyName + '" in ALL_ENEMIES_OBJ.';
 	}
 	return new Enemy(
 		ALL_ENEMIES_OBJ.get(enemyName).name,
 		ALL_ENEMIES_OBJ.get(enemyName).level,
 		ALL_ENEMIES_OBJ.get(enemyName).maxHealth,
 		ALL_ENEMIES_OBJ.get(enemyName).health,
 		ALL_ENEMIES_OBJ.get(enemyName).attack,
 		ALL_ENEMIES_OBJ.get(enemyName).defense,
 		ALL_ENEMIES_OBJ.get(enemyName).givenXP,
 		ALL_ENEMIES_OBJ.get(enemyName).possibleDrops,
 		ALL_ENEMIES_OBJ.get(enemyName).spawnRate,
 		ALL_ENEMIES_OBJ.get(enemyName).imgName
 		);
 }








