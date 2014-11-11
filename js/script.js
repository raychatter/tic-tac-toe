$(document).ready(function () {
	var playerXturn = true;
	var numMoves = 0;

	var startNewGame = function() {
		playerXturn = true;
		numMoves = 0;
		$('.square').text("");
		$('.reset-button-div').nextAll('div').remove();
		$('.main').html("Player <span id='player'>X</span>'s Turn.</div>");
		$('.square').bind({
			click: makeMove
		});
	};

	var makeMove = function() {
		$('.error').text("");
		if($(this).text()!="") {
			$(".error").text("Please choose a spot that is not taken.");
		} else {
			if(playerXturn) {
				$(this).text("X");
				$('#player').text("O");
				playerXturn = false;
				numMoves++;
			} else {
				$(this).text("O");
				$('#player').text("X");
				playerXturn = true;
				numMoves++;
			}
		}

		var winner = checkForWin();
		if(winner) {
			$('.main').text("Player "+winner+" wins!");
			$('.square').unbind("click");
		} else if(winner==="" && numMoves===9) {
			$('.main').text("Cat's Game!");
			$('.square').unbind("click");
		} 
	};

	var checkForWin = function () {
		var $squares = $('.square');
		var winner = numMoves%2==0 ? "O" : "X";
		var moves = [];

		// if 5 moves (or odd), we know x wins
		// if 6 moves (or even), o will have to be winner

		// only check for win if min # moves to win are made
		if(numMoves >= 5) { 
			$.each($squares, function (index, value) {
				moves.push($(value).text());
			});
			if(moves[4] == winner) {
				// Someone moved in the middle square
				if(moves[0] == winner && moves[8] == winner) {
					// drawLine('right-diagonal diagonal');
					return winner;
				} else if(moves[2] == winner && moves[6] == winner) {
					// drawLine('left-diagonal diagonal');
					return winner;
				} else if(moves[1] == winner && moves[7] == winner) {
					// drawLine('middle-vertical vertical');
					return winner;
				} else if(moves[3] == winner && moves[5] == winner) {
					// drawLine('middle-horizontal horizontal');
					return winner;
				} 
			} else {
				// check for win on the outsides
				if(moves[0] == winner && moves[1] == winner && moves[2] == winner) {
					// drawLine('top horizontal');
					return winner;
				} else if(moves[6] == winner && moves[7] == winner && moves[8] == winner) {
					// drawLine('bottom horizontal');
					return winner;
				} else if(moves[0] == winner && moves[3] == winner && moves[6] == winner) {
					// drawLine('left vertical');
					return winner;
				} else if(moves[2] == winner && moves[5] == winner && moves[8] == winner) {
					// drawLine('right vertical');
					return winner;
				} 
			}
			return ""; 
		}
	};

	var drawLine = function(cssClass) {
		$('body').append($('<div>').addClass('line '+cssClass));
	};

	$('#reset').on('click', startNewGame);
	startNewGame();
});