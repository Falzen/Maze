console.log('JS loading: encounterManager.js');

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








var startFight = function() {
	console.log('F started');
	addMessage('F started');
	// announce the Fight!
	isFightning = true;

	// choose an enemy from the appropriate level list
	var thisLevelEnemyList = enemyNames_by_mazeLevel.get(mazeSettings.level);

	// instanciate the enemy (stats, level, etc.)
	var randomEnemyData = getRandomItemFromArray(thisLevelEnemyList);

	//set it to global variable
	theCurrentEnnemy = createEnemy(randomEnemyData);

	// TODO announce the ennemy
	console.log('Current Enn : ' + theCurrentEnnemy.name);
	console.log('Enn stats : ', theCurrentEnnemy);
	addMessage('What do you do?', 'choice');

}


function combatAttack() {

	var dmg = player.attack * mapWeaponByName.get(player.weaponName).strength;
	theCurrentEnnemy.health -= dmg;
	if (theCurrentEnnemy.health <= 0) {
		theCurrentEnnemy.health = 0;
		endFight('victory');
	}
	else {
		addMessage('You hit '+ theCurrentEnnemy.name + ' for ' + dmg + '.\n' + theCurrentEnnemy.name + ' has ' + theCurrentEnnemy.health + 'hp left.');	
	combatEnemyTurn();
	}
}
function combatDefend() {
	addMessage('No defense option yet');
	combatEnemyTurn();
}
function combatObject() {
	addMessage('No object option yet');
	combatEnemyTurn();
}
function combatRun() {
	addMessage('No run option yet');
	combatEnemyTurn();
}

function endFight(outcome) {
	switch(outcome) {
		case 'victory':
			addMessage('Victory !', 'victory');
			isFightning = false;
			theCurrentEnnemy = null;
		break;
	}
}

function combatEnemyTurn(){
	addMessage(theCurrentEnnemy.name + ' says hello.', 'enemyAction');
}


console.log('JS loaded: encounterManager.js');