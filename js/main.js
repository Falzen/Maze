/*
Enregistrer des données dans sessionStorage
sessionStorage.setItem('clé', 'valeur');

Récupérer des données depuis sessionStorage
var data = sessionStorage.getItem('clé');

Supprimer des données de sessionStorage
sessionStorage.removeItem('clé');

Supprimer toutes les données de sessionStorage
sessionStorage.clear();
*/
/*
git stuff
/c/wamp64/www/perso/2018/maze repo/Maze
https://github.com/Falzen/Maze.git
Falzen
testament2501
*/


/* toggle admin ui and activate methods on top right hidden area doubleclick */
document.getElementById('hiddenAdminBtn').addEventListener('dblclick', function () {
	console.log('test');
	isAdmin = !isAdmin;
	console.log('isAdmin: ', isAdmin);
	refreshAdminUi();
});
function refreshAdminUi() {
	if (isAdmin) {
		$('.admin-ui').addClass('show');
	}
	else {
		$('.admin-ui').removeClass('show');
	}
}



/* manage player's movements */
document.addEventListener('keydown', function (ev) {
	switch (ev.key) {
		case 'z':
		player.move('up');
		break;

		case 'd':
		player.move('right');
		break;

		case 's':
		player.move('down');
		break;

		case 'q':
		player.move('left');
		break;
	}
});


$(saveBtn).click(function (ev) {
	// setCookie(mazeSettings, JSON.stringify(mazeSettings), 30);
	// setCookie(playerCurrentY, player.positions.currentY, 30);
	// setCookie(playerCurrentX, player.positions.currentX, 30);
	sessionStorage.setItem('mazeSettings', JSON.stringify(mazeSettings));
	sessionStorage.setItem('player', JSON.stringify(player));

	alert('Saved');
});

$(eraseBtn).click(function (ev) {
	sessionStorage.removeItem('mazeSettings');
	sessionStorage.removeItem('player');
	/*sessionStorage.clear();*/
	alert('Save erased');
	window.location.href = "";
});





/**
 * Builds the right kind of room
 * Receives and return the updatedMaze
 * @param {string} coordY
 * @param {string} coordX
 * @param {object} updatedMaze
 */
 function buildRoom(coordY, coordX, updatedMaze) {
 	/* flag */
 	var isRoomCreated = false;

 	/* if wall */
 	if (mazeSettings.wallPositions.indexOf(coordY + '-' + coordX) != -1) {
 		updatedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="is-wall" data-coords=""></td>';
 		isRoomCreated = true;
 	}

 	/* normal new room */
 	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY + '-' + coordX) == -1) {
 		updatedMaze += '<td id="td__' + coordY + '-' + coordX + '"  class="is-new" data-coords="' + coordY + '-' + coordX + '"></td>';
 		isRoomCreated = true;
 	}

 	/* player position */
 	if (!isRoomCreated && coordY == player.positions.currentY && coordX == player.positions.currentX) {
 		updatedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="player-position" data-coords=""></td>';
 		isRoomCreated = true;
 	}

 	/* normal visited room */
 	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY + '-' + coordX) != -1) {
 		updatedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="is-visited" data-coords=""></td>';
 		isRoomCreated = true;
 	}
 	
 	return updatedMaze;
 }


/**
 * Create the maze and inserts it into the DOM
 * Uses the static 'mazeSettings'
 */
 function drawMap() {
 	var updatedMaze = '';
 	for (var y = 0; y < mazeSettings.height; y++) {
 		updatedMaze += '<tr class="row__' + y + '">';
 		for (var x = 0; x < mazeSettings.width; x++) {
 			/* player position */
 			updatedMaze = buildRoom(y, x, updatedMaze);
 		}
 		updatedMaze += '</tr>';
 	}
 	theTable.innerHTML = updatedMaze;
 	refreshPlayerPosition();
 }

/**
 * Manages the logic of entering a room
 * @param coords {String} : this room's coordinates, formatted: 'yy-xx';
 */
 function enterRoom(coords) {
 	refreshPlayerPosition();

 	if (!isNewRoom(coords)){
 		return false;
 	}

 	if(roomHasEnemy()) {
 		startFight();
 	}


 	/* à la fin : ajoute la nouvelle room à la liste des visitées */
 	mazeSettings.visitedRooms.push(coords);
 }

/**
 * checks if room is already visited 
 * @return boolean
 */
 function isNewRoom(coords) {
 	return mazeSettings.visitedRooms.indexOf(coords) == -1;
 }

/**
 * Manage player position
 */
 function refreshPlayerPosition() {
	// blanks outdated position
	erasePlayerPosition();
	// sets new position in the maze
	drawPlayerPosition();
}

/**
 * enemy spawning or not
 * @return boolean
 */
function roomHasEnemy() {
	return Math.random() > ENEMY_SPAWN_RATE;
}

/**
Turns player's position into 'visited'
Note: player Object position is updated but not the maze itself yet
*/
function erasePlayerPosition() {
	//$('.player-position').attr('class', 'is-visited');
	$('.player-position').attr('class', 'is-visited');
}


/**
Sets player's current room
Note: updates the the maze itself (<td>)
*/
function drawPlayerPosition() {
	var newPlayerPosition = $("td[data-coords='" + player.positions.currentY + "-" + player.positions.currentX + "']");
	//$(newPlayerPosition).attr('class', 'player-position');
	$(newPlayerPosition).addClass('player-position').removeClass('is-visited');
}


/* Save Reminder */
var showSaveReminder = setInterval(function () {
	$('#dont-forget-to-save').toggleClass('is-showing');
	setTimeout(function () {
		$('#dont-forget-to-save').toggleClass('is-showing');
	}, 1500);
}, 20000);




function init() {
	if(continueFromSession) {
	}
	else {
		mazeSettings.visitedRooms.push(player.positions.startY + '-' + player.positions.startX);
	}
	
	drawMap();
}