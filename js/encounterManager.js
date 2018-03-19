console.log('encounterManager.js READY');
console.log('encounterManager - mazeSettings : ', mazeSettings);

var enemyNames_by_mazeLevel = new Map();

/**
 * enemies lists by level
 */
var enemiesLvl_1 = [];
var enemiesLvl_2 = [];
var enemiesLvl_3 = [];

/**
 * fills enemies lists by level 
 * from ALL_ENEMIES_OBJ
 */
function sortEnemies(enemyObj, name, map) {
	switch(enemyObj.level) {
		case 1: {
			enemiesLvl_1.push(enemyObj.name);
			break;
		}
		case 2: {
			enemiesLvl_2.push(enemyObj.name);
			break;
		}
		case 3: {
			enemiesLvl_3.push(enemyObj.name);
			break;
		}
	}
}
ALL_ENEMIES_OBJ.forEach(sortEnemies);

/**
 * fills map of available enemies list by maze level
 */
enemyNames_by_mazeLevel.set(1, enemiesLvl_1);
enemyNames_by_mazeLevel.set(2, enemiesLvl_2);
enemyNames_by_mazeLevel.set(3, enemiesLvl_3);

console.log(enemyNames_by_mazeLevel.get(1)[getRandomInt(0,2)]);
