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

