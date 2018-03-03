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



/* init variables */
var mazeSettings_FromSession = JSON.parse(sessionStorage.getItem('mazeSettings'));
var playerCurrentY_FromSession = sessionStorage.getItem('playerCurrentY');
var playerCurrentX_FromSession = sessionStorage.getItem('playerCurrentX');



var borderWalls = [
'0-0','1-0','2-0','3-0','4-0','5-0','6-0','7-0','8-0','9-0','10-0','11-0','12-0','13-0','14-0','15-0','16-0','17-0','18-0','19-0','20-0',
'20-1','20-2','20-3','20-4','20-5','20-6','20-7','20-8','20-9','20-10','20-11','20-12','20-13','20-14','20-15','20-16','20-17','20-18','20-19','20-20',
'0-20','1-20','2-20','3-20','4-20','5-20','6-20','7-20','8-20','9-20','10-20','11-20','12-20','13-20','14-20','15-20','16-20','17-20','18-20','19-20',
'0-1','0-2','0-3','0-4','0-5','0-6','0-7','0-8','0-9','0-10','0-11','0-12','0-13','0-14','0-15','0-16','0-17','0-18','0-19'
];

var someWalls_mazeSettings_h21_w21_outlines = ["16-9", "17-9", "18-9", "19-9", "19-11", "18-11", "17-11", "16-11", "16-12", "16-13", "16-14", "16-15", "16-8", "16-7", "16-6", "16-5", "16-4", "15-4", "14-4", "16-16", "15-16", "14-16", "14-17", "13-17", "12-17", "11-17", "14-3", "13-3", "12-3", "11-3", "10-3", "10-4", "10-16", "10-17", "9-4", "8-4", "7-4", "6-4", "6-3", "6-2", "5-2", "4-2", "3-2", "2-3", "1-4", "1-5", "1-6", "9-16", "8-16", "6-16", "7-16", "6-17", "6-18", "3-18", "4-18", "5-18", "2-17", "1-16", "1-15", "1-14", "1-8", "1-12", "2-7", "2-13", "2-9", "2-11", "1-11", "1-9", "1-7", "1-13", "2-4", "3-3", "2-16", "3-17", "5-3", "5-17"];
var someWalls_mazeSettings_h21_w21_inside = ["13-7","13-13","13-11","13-9","13-8","13-10","13-12","12-13","11-13","10-13","9-13","8-14","7-14","9-7","8-6","7-6","10-7","11-7","12-7","6-7","6-13","5-12","5-8","6-9","6-11","7-9","8-9","7-11","8-11","10-10","11-10","12-10","6-6","5-7","5-13","6-14","9-14","9-6","6-12","6-8"];



var theTable = document.getElementById('table');

var mazeSettings;
if (mazeSettings_FromSession != null) {
	var mazeSettings = mazeSettings_FromSession;
} else {
	mazeSettings = {
		height: 21,
		width: 21,
		wallPositions : borderWalls.concat(someWalls_mazeSettings_h21_w21_outlines).concat(someWalls_mazeSettings_h21_w21_inside),
		visitedRooms: []
	}
}

var player = {
	move: function(dir) {
		var nextCoord = '';
		if (dir == 'up') {
			nextCoord = 1*(player.positions.currentY-1)+'-'+player.positions.currentX;
			if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
				player.positions.currentY--;
			}
		}
		else if(dir == 'right') {
			nextCoord = player.positions.currentY+'-'+1*(player.positions.currentX+1);
			if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
				player.positions.currentX++;
			}
		}
		else if(dir == 'down') {
			nextCoord = 1*(player.positions.currentY+1)+'-'+player.positions.currentX;
			if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
				player.positions.currentY++;
			}
		}
		else if(dir == 'left') {
			nextCoord = player.positions.currentY+'-'+1*(player.positions.currentX-1);
			if (mazeSettings.wallPositions.indexOf(nextCoord) == -1) {
				player.positions.currentX--;
			}
		}
		/* ajoute la nouvelle room à la liste des visitées */
		if (mazeSettings.visitedRooms.indexOf(player.positions.currentY+'-'+player.positions.currentX) == -1) {
			mazeSettings.visitedRooms.push(player.positions.currentY+'-'+player.positions.currentX);
		}
		console.log(mazeSettings.visitedRooms);
		refreshPlayerPosition();
	},
	positions: {
		startY : mazeSettings.height-2,
		startX : Math.floor(mazeSettings.width/2),
		nextY : 0,
		nextX : 0,
		currentY : mazeSettings.height-2,
		currentX : Math.floor(mazeSettings.width/2),
		lastY : 0,
		lastX : 0
	}
}
if (playerCurrentY_FromSession != null && playerCurrentX_FromSession != null) {
	player.positions.currentY = playerCurrentY_FromSession;
	player.positions.currentX = playerCurrentX_FromSession;
}




document.addEventListener('keydown', function(ev) {
	switch(ev.key) {
		case 'z' :
		player.move('up');
		break;

		case 'd' :
		player.move('right');
		break;

		case 's' :
		player.move('down');
		break;

		case 'q' :
		player.move('left');
		break;
	}
});


var saveBtn = $('#save-btn');
$(saveBtn).click(function(ev) {
	sessionStorage.setItem('mazeSettings', JSON.stringify(mazeSettings));
	sessionStorage.setItem('playerCurrentY', player.positions.currentY);
	sessionStorage.setItem('playerCurrentX', player.positions.currentX);

	alert('Saved');
});

var eraseBtn = $('#erase-btn');
$(eraseBtn).click(function(ev) {
	sessionStorage.removeItem('mazeSettings');
	sessionStorage.removeItem('playerCurrentY');
	sessionStorage.removeItem('playerCurrentX');
	/*sessionStorage.clear();*/
	alert('Save erased');
	window.location.href="";
});




function init() {
	mazeSettings.visitedRooms.push(player.positions.startY+'-'+player.positions.startX);
	drawMap();
}


function buildRoom(coordY, coordX, updattedMaze) {
	/* flag */
	var isRoomCreated = false;

	/* if wall */
	if (mazeSettings.wallPositions.indexOf(coordY+'-'+coordX) != -1) {
		updattedMaze += '<td id="td__'+coordY+'-'+coordX+'" class="is-wall" data-coords=""></td>';
		isRoomCreated = true;
	}

	/* normal new room */
	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY+'-'+coordX) == -1){
		updattedMaze += '<td id="td__'+coordY+'-'+coordX+'"  class="is-new" data-coords="'+coordY+'-'+coordX+'"></td>';
		isRoomCreated = true;
	}

	/* player position */
	if (!isRoomCreated && coordY == player.positions.currentY && coordX == player.positions.currentX ) {
		updattedMaze += '<td id="td__'+coordY+'-'+coordX+'" class="player-position" data-coords=""></td>';
		isRoomCreated = true;
	} 

	/* normal visited room */
	if (!isRoomCreated && mazeSettings.visitedRooms.indexOf(coordY+'-'+coordX) != -1){
		updattedMaze += '<td id="td__'+coordY+'-'+coordX+'" class="is-visited" data-coords=""></td>';
		isRoomCreated = true;
	}

	return updattedMaze;
}


function drawMap() {
	var updattedMaze = '';
	for (var y=0; y<mazeSettings.height; y++) {
		updattedMaze += '<tr class="row__'+y+'">';
		for (var x=0; x<mazeSettings.width; x++) {
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
	var newPlayerPosition = $("td[data-coords='" + player.positions.currentY +"-"+player.positions.currentX+"']");
	$(newPlayerPosition).attr('class', 'player-position');
}







/* Save Reminder */
var showSaveReminder = setInterval(function() {
	$('#dont-forget-to-save').toggleClass('is-showing');
	setTimeout(function() {	
		$('#dont-forget-to-save').toggleClass('is-showing');
	}, 1500);
}, 20000);

init();



