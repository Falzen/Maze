console.log('encounterManager.js READY');
console.log('encounterManager - mazeSettings : ', mazeSettings);

var enemyNames_by_mazeLevel = new Map();


/**
 * sort Enemies By Standard Level 'X'
 * @return returns a list of enemies which standard level is 'X'
 */
function sortEnemiesByStandardLevel(lvl) {
	var enemyList = [];
	ALL_ENEMIES_TEMPLATES_BY_NAME.forEach(function(oneEnemyTemplate) {
		if (oneEnemyTemplate.level == lvl) {
			enemyList.push(oneEnemyTemplate);
		}
	});
	return enemyList;
}

enemyNames_by_mazeLevel.set(1, sortEnemiesByStandardLevel(1));
console.log(enemyNames_by_mazeLevel);








var startFight = function() {
	console.log('F started');
	// announce the Fight!
	isFightning = true;

	// choose an enemy from the appropriate level list
	var thisLevelEnemyList = enemyNames_by_mazeLevel.get(mazeSettings.level);

	// instanciate the enemy (stats, level, etc.)
	var randomEnemyData = getRandomItemFromArray(thisLevelEnemyList);
	var currentEnemy = createEnemy(randomEnemyData);

	// announce the ennemy
	console.log('!!! startFight with : ' + currentEnemy.name);

	// start the turn
}
//startFight();