var boardImg = new Image();
var redPiece = new Image(), blackPiece = new Image();
var activeColumn = -1;
var winner;
var board = new Array(7);
var XPIXELS = new Array(7);
var YPIXELS = new Array(6);

function drawMovement(canvas, xPos){
    var context = canvas.getContext('2d');
	drawBoard(canvas);
	
	if (xPos < 235){
		activeColumn = 0;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);
		
	}
	if (xPos >= 235 && xPos < 292){
		activeColumn = 1;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);
		
	}
	if (xPos >= 292 && xPos < 351){

		activeColumn = 2;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);

	}
	if (xPos >= 351 && xPos < 406){
		activeColumn = 3;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);

	}
	if (xPos >= 406 && xPos < 461){
		activeColumn = 4;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);

	}
	if (xPos >= 461 && xPos < 518){
		activeColumn = 5;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);

	}
	if (xPos >= 518){
		activeColumn = 6;
		context.drawImage(redPiece, XPIXELS[activeColumn], 0);

	}
}
function drawBoard(canvas){
	var i=0, j=0;
	var context = canvas.getContext('2d');
	context.drawImage(boardImg, 0, 0);
	for(i=0; i < 7; i++){
		for(j=0; j < 6; j++){
			if(board[i][j] === 1){
				context.drawImage(redPiece, XPIXELS[i], YPIXELS[j]);
			}
			if(board[i][j] === 2){
				context.drawImage(blackPiece, XPIXELS[i], YPIXELS[j]);
			}
		}
	}
}
function getMousePos(canvas, evt){
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
 
    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;

    return mouseX;
}

function initArrays(){
	var i = 0, j = 0;
	winner = -1;
	//Make the array 2d
	for(i=0; i < 7; i++){
		board[i] = new Array(6);
	}
	
	//Initialize the 2D array
	for(i = 0; i < 7; i++){
		for(j = 0; j < 6; j++){
			board[i][j] = -1;
		}
	}
	XPIXELS[0] = 186;
	XPIXELS[1] = 244;
	XPIXELS[2] = 300;
	XPIXELS[3] = 356;
	XPIXELS[4] = 412;
	XPIXELS[5] = 468;
	XPIXELS[6] = 523;
	
	YPIXELS[0] = 50;
	YPIXELS[1] = 102;
	YPIXELS[2] = 153;
	YPIXELS[3] = 204;
	YPIXELS[4] = 254;
	YPIXELS[5] = 306;
}

//returns open row if there's a spot, else returns -1
function openCheck(column){
	var open = 0;
	var temp = -2;
	for(var i = 0; i < 6 ; i++){
		open = board[column][i];
		if(open === -1){
			temp = i;
		}
		if(temp != -2 && open != -1){
			return temp
		}
		if(i === 5 && open === -1){
			return 5;
		}
	}
		return -1;
}

function winCheck(){
	var player;
	for(var i = 0; i < 7; i++){
		for(var j = 0; j < 6; j++){
			player = board[i][j];
			if(player != -1){
				//Check horizontal
				if(j+3 < 6){
					if((board[i][j+1] === player) && (board[i][j+2] === player) && (board[i][j+3] === player)){
						return player;
					}
				}
				//Check Vertical
				if(i+3 < 7){
					if((board[i+1][j] === player) && (board[i+2][j] === player) && (board [i+3][j] === player)){
						return player;
					}
				}
				//Check Diagonal (/)
				if((i+3 < 7) && (j+3 < 6)){
					if((board[i+1][j+1] === player) && (board[i+2][j+2] === player) && (board[i+3][j+3] === player)){
						return player;
					}
				}
				//Check Diagonal (\)
				if((i+3 < 7) && (j-3 >= 0)){
					if((board[i+1][j-1] === player) && (board[i+2][j-2] === player) && (board[i+3][j-3] === player)){
						return player;
					}
				}
			}
		}
	}
	return -1;
}

function updateBoard(player, column, row){
	switch(player){
		case 1:
			board[column][row] = 1;
			break;
		case 2:
			board[column][row] = 2;
			break;
	}
	tieCheck();
	//win = winCheck()
	//if(win ===true) declare winner and reset
	//else tie = tieCheck()
	//if(tie === true) declare tie and reset
	//else move on, do nothing
}
function tieCheck(){
	var temp = -1;;
	for(var i = 0; i < 7; i++){
		if(board[i][0] === -1)
				temp = 0;			
	}
	if(temp === -1){
		alert("Tie");
		initArrays();
	}
	
}
function moveComputer(){
	var isOpen = -2;
	var found = false;
	while(found ===false){
		var rand = Math.floor((Math.random()*7));
		isOpen = openCheck(rand);
		if(isOpen != -1){
			updateBoard(2, rand, isOpen);
			winner = winCheck();
			found = true;
		}
	}

}
window.onload = function(){
    var canvas = document.getElementById('mainCanvas');
    var context = canvas.getContext('2d');
	var isOpen = -1;
	var temp;
	var gameover = -1;
	redPiece.src = "redPiece.png";
	blackPiece.src = "blackPiece.png";
	boardImg.src = "connect-four.png";
	context.drawImage(boardImg, 0, 0);
	initArrays();
    canvas.addEventListener('mousemove', function(evt){
        var mousePos = getMousePos(canvas, evt);
        drawMovement(canvas, mousePos);
		if(winner === 1){
			alert("You Win!");
			initArrays();
		}
		if(winner === 2){
			alert("You Lose =(");
			initArrays();
		}
    }, false);
	canvas.addEventListener("click", function(){
		isOpen = openCheck(activeColumn);
		if(isOpen != -1){
			updateBoard(1, activeColumn, isOpen);
			winner = winCheck();
			if(winner != 1){
				moveComputer();
			}
		}
    });

};