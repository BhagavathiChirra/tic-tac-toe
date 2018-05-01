const game = {
  player : "O",
  id : 0,
  gameBoard : [
    null,null,null,
    null,null,null,
    null,null,null
  ],
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
        //alert(" X is the winner");
        //this.visualDisplayWin();
        // $('#message').html('Winner is ')
        //this.startNewGame();
      }
      else if(winO == 3){
        //alert("O is the winner");
        //this.startNewGame();
        return win;
      }
    }
  },
  startNewGame : function(){
    $("div >div").html("");
  }
};

$(document).ready(function(){
  $("div > div").click(function(event) {
    game.id = "#"+this.id;
    //debugger;
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
      const $gameIsWon = game.winGame();
      if($gameIsWon){
        visualDisplayWin($gameIsWon);
        playAgain();
      }
    }
  });
  function visualDisplayWin(win){
    for(i=0; i< win.length; i++){
      $(`#${win[i]}`).css({"background-color":"pink"});
    }
  }
  function playAgain(){
    //$(".game").hide();
  }
});
