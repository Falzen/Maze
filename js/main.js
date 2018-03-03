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
	sessionStorage.setItem('mazeSettings', JSON.stringify(mazeSettings));
	sessionStorage.setItem('playerCurrentY', player.positions.currentY);
	sessionStorage.setItem('playerCurrentX', player.positions.currentX);

	alert('Saved');
});

$(eraseBtn).click(function (ev) {
	sessionStorage.removeItem('mazeSettings');
	sessionStorage.removeItem('playerCurrentY');
	sessionStorage.removeItem('playerCurrentX');
	/*sessionStorage.clear();*/
	alert('Save erased');
	window.location.href = "";
});




function init() {
	mazeSettings.visitedRooms.push(player.positions.startY + '-' + player.positions.startX);
	drawMap();
}


function buildRoom(coordY, coordX, updattedMaze) {
	/* flag */
	var isRoomCreated = false;

	/* if wall */
	if (mazeSettings.wallPositions.indexOf(coordY + '-' + coordX) != -1) {
		updattedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="is-wall" data-coords=""></td>';
		isRoomCreated = true;
	}

	/* normal new room */
	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY + '-' + coordX) == -1) {
		updattedMaze += '<td id="td__' + coordY + '-' + coordX + '"  class="is-new" data-coords="' + coordY + '-' + coordX + '"></td>';
		isRoomCreated = true;
	}

	/* player position */
	if (!isRoomCreated && coordY == player.positions.currentY && coordX == player.positions.currentX) {
		updattedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="player-position" data-coords=""></td>';
		isRoomCreated = true;
	}

	/* normal visited room */
	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY + '-' + coordX) != -1) {
		updattedMaze += '<td id="td__' + coordY + '-' + coordX + '" class="is-visited" data-coords=""></td>';
		isRoomCreated = true;
	}
	
	return updattedMaze;
}


function drawMap() {
	var updattedMaze = '';
	for (var y = 0; y < mazeSettings.height; y++) {
		updattedMaze += '<tr class="row__' + y + '">';
		for (var x = 0; x < mazeSettings.width; x++) {
			/* player position */
			updattedMaze = buildRoom(y, x, updattedMaze);
		}
		updattedMaze += '</tr>';
	}
	theTable.innerHTML = updattedMaze;
}

function refreshPlayerPosition() {
	erasePlayerPosition();
	drawPlayerPosition();
}

function erasePlayerPosition() {
	$('.player-position').attr('class', 'is-visited');
}

function drawPlayerPosition() {
	var newPlayerPosition = $("td[data-coords='" + player.positions.currentY + "-" + player.positions.currentX + "']");
	$(newPlayerPosition).attr('class', 'player-position');
}


/* Save Reminder */
var showSaveReminder = setInterval(function () {
	$('#dont-forget-to-save').toggleClass('is-showing');
	setTimeout(function () {
		$('#dont-forget-to-save').toggleClass('is-showing');
	}, 1500);
}, 20000);

init();



