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
	theCurrentEnemy = createEnemy(randomEnemyData);

	setEnemyImg();

	// TODO announce the ennemy
	console.log('Current Enn : ' + theCurrentEnemy.name);
	console.log('Enn stats : ', theCurrentEnemy);
	addMessage('What do you do?', 'choice');

}

function setEnemyImg() {
	$('#enemyImg').attr('src', 'img/enemies/'+theCurrentEnemy.imgName);
	showMazeOverlay();
}

function showMazeOverlay() {
	$(mazeOverlay).addClass('showOverlay');
}
function hideMazeOverlay() {
	$(mazeOverlay).removeClass('showOverlay');
}

function combatAttack() {

	var dmg = player.attack * mapWeaponByName.get(player.weaponName).strength;
	theCurrentEnemy.health -= dmg;
	if (theCurrentEnemy.health <= 0) {
		theCurrentEnemy.health = 0;
		endFight('victory');
	}
	else {
		addMessage('You hit '+ theCurrentEnemy.name + ' for ' + dmg + '.\n' + theCurrentEnemy.name + ' has ' + theCurrentEnemy.health + 'hp left.');	
		combatEnemyTurn('combatAttack');
	}
}
function combatDefend() {
	addMessage('No defense option yet');
	combatEnemyTurn('combatDefend');
}
function combatObject() {
	addMessage('No object option yet');
	combatEnemyTurn('combatObject');
}
function combatRun() {
	addMessage('No run option yet');
	combatEnemyTurn('combatRun');
}

function endFight(outcome) {
	switch(outcome) {
		case 'victory':
			addMessage('Victory !', 'victory');
			isFightning = false;
			theCurrentEnemy = null;
		break;
	}
}

/**
@playerActionLastTurn String
	possible values : 
		combatAttack
		combatDefend
		combatObject
		combatRun
*/
function combatEnemyTurn(playerActionLastTurn) {
	addMessage(theCurrentEnemy.name + ' says hello.', 'enemyAction');
}


console.log('JS loaded: encounterManager.js');