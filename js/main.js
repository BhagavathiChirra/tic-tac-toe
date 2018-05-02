const game = {
  player : "O",
  id : 0,
  gameBoard : [
    null,null,null,
    null,null,null,
    null,null,null
  ],

  gameOver: false,
  noOfClicks: 0,

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
  winGame : function(){
    for(i=0; i<this.winningChances.length; i++)
    {
      const win = this.winningChances[i];
      let winX = 0;
      let winO = 0;
      for(j=0; j< win.length; j++)
      {
        if(this.gameBoard[win[j]] == "X"){
          winX += 1;
        }else if(this.gameBoard[win[j]] == "O"){
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
    // debugger;
    $("#box > div").html("").removeClass("winSquare");
    // $("div#game > div");
    game.gameBoard = [
      null,null,null,
      null,null,null,
      null,null,null
    ];
    game.player = "O";
    game.noOfClicks = 0;
    game.gameOver = false;
  }
};

$(document).ready(function(){
  $("#box > div").click(function(event) {
    game.id = "#"+this.id;
    // checking for empty
    if(!$(game.id).html()){
      if(game.player == "O")
      {
        $(game.id).html("X");
        game.player = "X";
        game.gameBoard[this.id] = "X";
      }
      else{
        $(game.id).html("O");
        game.player = "O";
        game.gameBoard[this.id] = "O";
      }
      // getting winning row
      const gameIsWon = game.winGame();
      if(gameIsWon){
        game.gameOver = true;
        // visually displaying winning row
        visualDisplayWin(gameIsWon);
        // starting new game after winning one game
        playAgain();
      }
      game.noOfClicks +=1;
    }
    // starting new game after tie
    if(game.noOfClicks == 9){
      playAgain();
    }
     // empty check
  });
  function visualDisplayWin(win){
    for(i=0; i< win.length; i++){
      $(`#${win[i]}`).addClass('winSquare');  //css({"background-color":"pink"});
    }
  }
  function playAgain(){
    $('#box2').show();
    $("#box2").addClass("playAgain");
  }
  $("#btnGameOver").click(function( event ){
    // event.stopPropagation();  // prevent click event from passing through to game board
    game.startNewGame();
    $("#box2").hide();
  });
});
