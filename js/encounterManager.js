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
	setEnemyStats();

	// TODO announce the ennemy
	console.log('Current Enn : ' + theCurrentEnemy.name);
	console.log('Enn stats : ', theCurrentEnemy);
	addMessage('What do you do?', 'choice');

	setTimeout(showMazeOverlay, 200);
	setTimeout(showCombatActions, 700);
	// will forbid multiple actions in one turn
	canDoAction = true;
	//showCombatActions();

}

function showCombatActions() {
	$('#actions').addClass('show-actions').removeClass('hide-actions');
}
function hideCombatActions() {
	$('#actions').addClass('hide-actions').removeClass('show-actions');
}

function setEnemyImg() {
	$('#enemyImg').attr('src', 'img/enemies/'+theCurrentEnemy.imgName);	
}
function unsetEnemyImg() {
	$('#enemyImg').attr('src', '');	
}

function setEnemyStats() {
	$('.enemy-hp').text(theCurrentEnemy.health);
}
function refreshEnemyStats() {
	setEnemyStats();
}
function unsetEnemyStats() {
	$('.enemy-hp').text('');	
}



function showMazeOverlay() {
	$(mazeOverlay).addClass('showOverlay').removeClass('hideOverlay');
}
function hideMazeOverlay() {
	$(mazeOverlay).addClass('hideOverlay').removeClass('showOverlay');
}


function combatAttack() {	
	// weapon used as a multiplier of strength
	var damageFromPlayer = player.attack * mapWeaponByName.get(player.weaponName).strength;

	
	// 20% of ignoring enemy's defense
	var enemyProtection = theCurrentEnemy.defense;
	if(Math.random() > 0.8) {
		enemyProtection = 0;
	}

	// final damages dealt
	var damageDealt = damageFromPlayer - enemyProtection;
	theCurrentEnemy.health -= damageDealt;

	// refresh the view
	refreshEnemyStats();

	// won the fight
	if (theCurrentEnemy.health <= 0) {
		theCurrentEnemy.health = 0;
		endFight('victory');
	}
	// keep fighting
	else {
		addMessage('You hit '+ theCurrentEnemy.name + ' for ' + damageDealt + '.\n' + theCurrentEnemy.name + ' has ' + theCurrentEnemy.health + 'hp left.');	
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
	var msg = '';
	switch(outcome) {
		case 'victory':
		msg += '* * * * * * * * * * * * * * * * * *<br/>';
		msg += '* * *     V I C T O R Y !!     * * *<br/>';
		msg += '* * * * * * * * * * * * * * * * * *<br/>';
			addMessage(msg, 'victory');
			isFightning = false;
			theCurrentEnemy = null;
		break;
	}
	unsetEnemyImg();	
	hideMazeOverlay();
	hideCombatActions();
}

/**
@param playerActionLastTurn
	'attack'
	'defend'
	'object'
	'run'
*/
function combatEnemyTurn(playerActionLastTurn) {	
	addMessage(theCurrentEnemy.name + ' says hello.', 'enemyAction');

	// allows player to do battle again	
	canDoAction = true;
}


console.log('JS loaded: encounterManager.js');