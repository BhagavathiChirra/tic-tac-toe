const game = {
  id : 0,
  gameBoard : [
    null,null,null,
    null,null,null,
    null,null,null
  ],
  gameOver: false,
  AIPlayer: "",
  humanPlayer:"",
  winningChances : [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
  ],
  noOfWinsOfHuman : 0,
  noOfWinsOfAI : 0,
  moveCount : 0,
  winGame : function(){
    for(i=0; i<this.winningChances.length; i++)
    {
      const win = this.winningChances[i];
      let winX = 0;
      let winO = 0;
      for(j=0; j< win.length; j++)
      {
        if(this.gameBoard[win[j]] == game.humanPlayer){
          winX += 1;
        }else if(this.gameBoard[win[j]] == game.AIPlayer){
          winO += 1;
        }
      }
      if(winX == 3){
        return win;
      }
      else if(winO == 3){
        return win;
      }
    }
  },
  startNewGame : function(){
    $("#box > div").html("").removeClass("winSquare");
    game.reset
    game.gameBoard = [
      null,null,null,
      null,null,null,
      null,null,null
    ];
    game.player = "O";
    game.gameOver = false;
    game.moveCount = 0;
  }
};

$(document).ready(function(){
  // starting div to let the user to choose "X" or "O" or "Pic"
  // click event for divs
  $("#chosenX").click(function(event){
    //debugger;
    $('#startingBox').hide();
    $('#box').show();
    game.humanPlayer = 'X';
    game.AIPlayer = 'O';
  });
  $('#chosenO').click(function(event){
    $('#startingBox').hide();
    $('#box').show();
    game.humanPlayer = 'O';
    game.AIPlayer = 'X';
  });

  $("#box > div").click(function(event) {
    game.id = "#"+this.id;
    // checking for empty
    if(!$(game.id).html()){
      $(game.id).html(game.humanPlayer);
      game.gameBoard[this.id] = game.humanPlayer;
      game.moveCount++;
      boardCheck();
      simpleAIMove();
      game.moveCount++;
      boardCheck();
    }
  }); // end of game click handler

  // displaying pattern
  function visualDisplayWin(win){
    for(i=0; i< win.length; i++){
      $(`#${win[i]}`).addClass('winSquare');  //css({"background-color":"pink"});
    }
  }
  // opening up play again div
  function playAgain( winner ){
    $('#box2').show();
    if(winner === 'draw'){
      $('.gameOver >div>span').html('game Draw!<br/>');
    } else {
      if(winner == game.humanPlayer){
        $('.gameOver >div>span').html(`gameOver! <br/> "${winner}" Won the game for ${game.noOfWinsOfHuman} time${ game.noOfWinsOfHuman > 1 ? 's' : '' }`);
      } else {
        $('.gameOver >div>span').html(`gameOver! <br/> "${winner}" Won the game for ${game.noOfWinsOfAI} time${ game.noOfWinsOfAI > 1 ? 's' : '' }`);
      }
    }
    $("#box2").addClass("playAgain");
  }
  // starting new game upon clicking
  $("#btnGameOver").click(function( event ){
    // event.stopPropagation();  // prevent click event from passing through to game board
    game.startNewGame();
    $("#box2").hide();
  });
  $("#exitGame").click(function(event){
    //location.reload();
    game.noOfWinsOfHuman = 0;
    game.noOfWinsOfAI = 0;
    game.startNewGame();
    $("#box2").hide();
    $('#box').hide();
    $("#startingBox").show();
  });

  // const myCompMove = function () {
  //   // if center square is free, take it
  //   // else choose a random free square
  // };
  // const AITakeSquare = function ( id ) {
  //   if( !game.gameBoard[ id ] ){
  //     $('#' + id).html("O");
  //     game.gameBoard[ id ] = "O";
  //     return true;
  //   }
  //   return false;
  // };

//*************  AI logic  ***************//
  const simpleAIMove = function () {
    // if( AITakeSquare( 4 ) ){
    //   return;
    // }
    if(game.moveCount>4)
    {
      // see if we can win in this move, i.e. do we already have two in a row somewhere
      // [0,1,2]
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[1] === game.AIPlayer && game.gameBoard[2] === null){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[1] === null && game.gameBoard[2] === game.AIPlayer){
        $('#1').html(game.AIPlayer);
        game.gameBoard[1] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[1] === game.AIPlayer && game.gameBoard[2] === game.AIPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[3,4,5]
      if(game.gameBoard[3] === game.AIPlayer && game.gameBoard[4] === game.AIPlayer && game.gameBoard[5] === null){
        $('#5').html(game.AIPlayer);
        game.gameBoard[5] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[3] === game.AIPlayer && game.gameBoard[4] === null && game.gameBoard[5] === game.AIPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[3] === null && game.gameBoard[4] === game.AIPlayer && game.gameBoard[5] === game.AIPlayer){
        $('#3').html(game.AIPlayer);
        game.gameBoard[3] = game.AIPlayer;
        return;
      }
      //[6,7,8]
      if(game.gameBoard[6] === game.AIPlayer && game.gameBoard[7] === game.AIPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[6] === game.AIPlayer && game.gameBoard[7] === null && game.gameBoard[8] === game.AIPlayer){
        $('#7').html(game.AIPlayer);
        game.gameBoard[7] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[6] === null && game.gameBoard[7] === game.AIPlayer && game.gameBoard[8] === game.AIPlayer){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      //[0,3,6]
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[3] === game.AIPlayer && game.gameBoard[6] === null){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[3] === null && game.gameBoard[6] === game.AIPlayer){
        $('#3').html(game.AIPlayer);
        game.gameBoard[3] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[3] === game.AIPlayer && game.gameBoard[6] === game.AIPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[1,4,7]
      if(game.gameBoard[1] === game.AIPlayer && game.gameBoard[4] === game.AIPlayer && game.gameBoard[7] === null){
        $('#7').html(game.AIPlayer);
        game.gameBoard[7] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[1] === game.AIPlayer && game.gameBoard[4] === null && game.gameBoard[7] === game.AIPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[1] === null && game.gameBoard[4] === game.AIPlayer && game.gameBoard[7] === game.AIPlayer){
        $('#1').html(game.AIPlayer);
        game.gameBoard[1] = game.AIPlayer;
        return;
      }
      //[2,5,8]
      if(game.gameBoard[2] === game.AIPlayer && game.gameBoard[5] === game.AIPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === game.AIPlayer && game.gameBoard[5] === null && game.gameBoard[8] === game.AIPlayer){
        $('#5').html(game.AIPlayer);
        game.gameBoard[5] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === null && game.gameBoard[5] === game.AIPlayer && game.gameBoard[8] === game.AIPlayer){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }
      //[0,4,8]
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[4] === game.AIPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.AIPlayer && game.gameBoard[4] === null && game.gameBoard[8] === game.AIPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[4] === game.AIPlayer && game.gameBoard[8] === game.AIPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[2,4,6]
      if(game.gameBoard[2] === game.AIPlayer && game.gameBoard[4] === game.AIPlayer && game.gameBoard[6] === null){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === game.AIPlayer && game.gameBoard[4] === null && game.gameBoard[6] === game.AIPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === null && game.gameBoard[4] === game.AIPlayer && game.gameBoard[6] === game.AIPlayer){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }

    }
    // checking if X occupied 2 places
    if(game.moveCount>2){
      // see if we can win in this move, i.e. do we already have two in a row somewhere
      // [0,1,2]
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[1] === game.humanPlayer && game.gameBoard[2] === null){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[1] === null && game.gameBoard[2] === game.humanPlayer){
        $('#1').html(game.AIPlayer);
        game.gameBoard[1] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[1] === game.humanPlayer && game.gameBoard[2] === game.humanPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[3,4,5]
      if(game.gameBoard[3] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[5] === null){
        $('#5').html(game.AIPlayer);
        game.gameBoard[5] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[3] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[5] === game.humanPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[3] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[5] === game.humanPlayer){
        $('#3').html(game.AIPlayer);
        game.gameBoard[3] = game.AIPlayer;
        return;
      }
      //[6,7,8]
      if(game.gameBoard[6] === game.humanPlayer && game.gameBoard[7] === game.humanPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[6] === game.humanPlayer && game.gameBoard[7] === null && game.gameBoard[8] === game.humanPlayer){
        $('#7').html(game.AIPlayer);
        game.gameBoard[7] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[6] === null && game.gameBoard[7] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      //[0,3,6]
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[3] === game.humanPlayer && game.gameBoard[6] === null){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[3] === null && game.gameBoard[6] === game.humanPlayer){
        $('#3').html(game.AIPlayer);
        game.gameBoard[3] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[3] === game.humanPlayer && game.gameBoard[6] === game.humanPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[1,4,7]
      if(game.gameBoard[1] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[7] === null){
        $('#7').html(game.AIPlayer);
        game.gameBoard[7] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[1] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[7] === game.humanPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[1] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[7] === game.humanPlayer){
        $('#1').html(game.AIPlayer);
        game.gameBoard[1] = game.AIPlayer;
        return;
      }
      //[2,5,8]
      if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[5] === game.humanPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[5] === null && game.gameBoard[8] === game.humanPlayer){
        $('#5').html(game.AIPlayer);
        game.gameBoard[5] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === null && game.gameBoard[5] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }
      //[0,4,8]
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[8] === null){
        $('#8').html(game.AIPlayer);
        game.gameBoard[8] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[8] === game.humanPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[0] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
        $('#0').html(game.AIPlayer);
        game.gameBoard[0] = game.AIPlayer;
        return;
      }
      //[2,4,6]
      if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[6] === null){
        $('#6').html(game.AIPlayer);
        game.gameBoard[6] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[6] === game.humanPlayer){
        $('#4').html(game.AIPlayer);
        game.gameBoard[4] = game.AIPlayer;
        return;
      }
      if(game.gameBoard[2] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[6] === game.humanPlayer){
        $('#2').html(game.AIPlayer);
        game.gameBoard[2] = game.AIPlayer;
        return;
      }
    }

    // take center square if empty
    if( !game.gameBoard[4] ){
      $('#4').html(game.AIPlayer);
      game.gameBoard[4] = game.AIPlayer;
      return;
    }
    // take top left corner if empty
    if( !game.gameBoard[0] ){
      $('#0').html(game.AIPlayer);
      game.gameBoard[0] = game.AIPlayer;
      return;
    }
    // take bottom right corner if empty
    if( !game.gameBoard[8] ){
      $('#8').html(game.AIPlayer);
      game.gameBoard[8] = game.AIPlayer;
      return;
    }
    // take top right corner if empty
    if( !game.gameBoard[2] ){
      $('#2').html(game.AIPlayer);
      game.gameBoard[2] = game.AIPlayer;
      return;
    }
    // take bottom left corner if empty
    if( !game.gameBoard[6] ){
      $('#6').html(game.AIPlayer);
      game.gameBoard[6] = game.AIPlayer;
      return;
    }

  };
//***************
  const boardCheck = function(){
    // getting winning row
    const gameIsWon = game.winGame();
    if(gameIsWon){
      game.gameOver = true;
      if(game.gameBoard[gameIsWon[0]] === game.humanPlayer ){
        game.noOfWinsOfHuman++;
      }else{
        game.noOfWinsOfAI++;
      }
      // visually displaying winning row
      visualDisplayWin(gameIsWon);
      playAgain(game.gameBoard[gameIsWon[0]]);
    } else if(game.moveCount === 10){
      // starting new game after tie
      playAgain('draw');
    }
  } // end boardCheck;
});
