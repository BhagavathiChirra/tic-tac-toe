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
  noOfWinsOfX : 0,
  noOfWinsOfO : 0,
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
    game.reset
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
  // starting div to let the user to choose "X" or "O" or "Pic"
  // click event for divs
  $("#chosenX").click(function(event){
    $('#startingBox').hide();
    $('#box').show();
  });
  $('#chosenO').click(function(event){
    $('#startingBox').hide();
    $('#box').show();
    game.player = "X";
  });

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
        //$(game.id).html("O");
        game.player = "O";
        //game.gameBoard[this.id] = "O";
        AImove();
      }
      // getting winning row
      const gameIsWon = game.winGame();
      if(gameIsWon){
        game.gameOver = true;
        // visually displaying winning row
        visualDisplayWin(gameIsWon);
        if(game.player == "X"){
          game.noOfWinsOfX +=1;
        }else game.noOfWinsOfO +=1;
        // starting new game after winning one game
        playAgain(game.player);
      }
      game.noOfClicks +=1;
    }
    // starting new game after tie
    if(game.noOfClicks == 5){
      playAgain();
    }
     // empty check
  });
  // displaying pattern
  function visualDisplayWin(win){
    for(i=0; i< win.length; i++){
      $(`#${win[i]}`).addClass('winSquare');  //css({"background-color":"pink"});
    }
  }
  // opening up play again div
  function playAgain(player){
    $('#box2').show();
    if(player == "X"){
      $('.gameOver >div>span').html(`gameOver! <br/> "${player}" Won the game for ${game.noOfWinsOfX} time/s`);
    }else $('.gameOver >div>span').html(`gameOver! <br/> "${player}" Won the game for ${game.noOfWinsOfO} time/s`);
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
    game.noOfWinsOfX = 0;
    game.noOfWinsOfO = 0;
    game.startNewGame();
    $("#box2").hide();
    $('#box').hide();
    $("#startingBox").show();
  });

  function AImove(){
    // div0 = $('#0').html();
    // div1 = $('#1').html();
    // div2 = $('#2').html();
    // div3 = $('#3').html();
    // div4 = $('#4').html();
    // div5 = $('#5').html();
    // div6 = $('#6').html();
    // div7 = $('#7').html();
    // div8 = $('#8').html();


debugger;
  //   if(game.gameBoard[4] ==""){
  //     $('#4').html("O");
  //     game.gameBoard[4] = "O";
  //     if(this.id == 2){
  //       $('#6').html("O");
  //       game.gameBoard[6] = "O";
  //       if(this.id == 1){
  //         $('#1').html("O");
  //         game.gameBoard[7] = "O";
  //         if(this.id == 3){
  //           $('#3').html("O");
  //           game.gameBoard[5] = "O";
  //         }
  //         else if(this.id == 5){
  //           $('#5').html("O");
  //           game.gameBoard[3] = "O";
  //         }
  //       }else if(this.id == 7){
  //         $('#7').html("O");
  //         game.gameBoard[1] = "O";
  //       }
  //     }else{
  //       $('#6').html("O");
  //       game.gameBoard[2] = "O";
  //     }
  //   }
  //   else{
  //     $('#1').html("O");
  //     game.gameBoard[1] = "O";
  //   }
  // }

  if(game.gameBoard[4] ==""){
    $('#4').html("O");
    game.gameBoard[4] = "O";
  }else if(game.id == '#4'){
    $('#0').html("O");
    game.gameBoard[0] = "O";
  }
  if(game.id == '#8'){
    $('#2').html("O");
    game.gameBoard[2] = "O";
  }



    if(this.id == 2){
      $('#6').html("O");
      game.gameBoard[6] = "O";
      if(this.id == 1){
        $('#1').html("O");
        game.gameBoard[7] = "O";
        if(this.id == 3){
          $('#3').html("O");
          game.gameBoard[5] = "O";
        }
        else if(this.id == 5){
          $('#5').html("O");
          game.gameBoard[3] = "O";
        }
      }else if(this.id == 7){
        $('#7').html("O");
        game.gameBoard[1] = "O";
      }
    }else{
      $('#6').html("O");
      game.gameBoard[2] = "O";
    }
  }
  else{
    $('#1').html("O");
    game.gameBoard[1] = "O";
  }
}


});



//
// const simpleAIMove = function () {
//   // if( AITakeSquare( 4 ) ){
//   //   return;
//   // }
//   //
//
//   if(game.moveCount>5)
//   {
//     // see if we can win in this move, i.e. do we already have two in a row somewhere
//     // [0,1,2]
//     if(game.gameBoard[0] === "O" && game.gameBoard[1] === "O" && game.gameBoard[2] === null){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === "O" && game.gameBoard[1] === null && game.gameBoard[2] === "O"){
//       $('#1').html("O");
//       game.gameBoard[1] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[1] === "O" && game.gameBoard[2] === "O"){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[3,4,5]
//     if(game.gameBoard[3] === "O" && game.gameBoard[4] === "O" && game.gameBoard[5] === null){
//       $('#5').html("O");
//       game.gameBoard[5] = "O";
//       return;
//     }
//     if(game.gameBoard[3] === "O" && game.gameBoard[4] === null && game.gameBoard[5] === "O"){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[3] === null && game.gameBoard[4] === "O" && game.gameBoard[5] === "O"){
//       $('#3').html("O");
//       game.gameBoard[3] = "O";
//       return;
//     }
//     //[6,7,8]
//     if(game.gameBoard[6] === "O" && game.gameBoard[7] === "O" && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[6] === "O" && game.gameBoard[7] === null && game.gameBoard[8] === "O"){
//       $('#7').html("O");
//       game.gameBoard[7] = "O";
//       return;
//     }
//     if(game.gameBoard[6] === null && game.gameBoard[7] === "O" && game.gameBoard[8] === "O"){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     //[0,3,6]
//     if(game.gameBoard[0] === "O" && game.gameBoard[3] === "O" && game.gameBoard[6] === null){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === "O" && game.gameBoard[3] === null && game.gameBoard[6] === "O"){
//       $('#3').html("O");
//       game.gameBoard[3] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[3] === "O" && game.gameBoard[6] === "O"){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[1,4,7]
//     if(game.gameBoard[1] === "O" && game.gameBoard[4] === "O" && game.gameBoard[7] === null){
//       $('#7').html("O");
//       game.gameBoard[7] = "O";
//       return;
//     }
//     if(game.gameBoard[1] === "O" && game.gameBoard[4] === null && game.gameBoard[7] === "O"){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[1] === null && game.gameBoard[4] === "O" && game.gameBoard[7] === "O"){
//       $('#1').html("O");
//       game.gameBoard[1] = "O";
//       return;
//     }
//     //[2,5,8]
//     if(game.gameBoard[2] === "O" && game.gameBoard[5] === "O" && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === "O" && game.gameBoard[5] === null && game.gameBoard[8] === "O"){
//       $('#5').html("O");
//       game.gameBoard[5] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === null && game.gameBoard[5] === "O" && game.gameBoard[8] === "O"){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//     //[0,4,8]
//     if(game.gameBoard[0] === "O" && game.gameBoard[4] === "O" && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === "O" && game.gameBoard[4] === null && game.gameBoard[8] === "O"){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[4] === "O" && game.gameBoard[8] === "O"){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[2,4,6]
//     if(game.gameBoard[2] === "O" && game.gameBoard[4] === "O" && game.gameBoard[6] === null){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === "O" && game.gameBoard[4] === null && game.gameBoard[6] === "O"){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === null && game.gameBoard[4] === "O" && game.gameBoard[6] === "O"){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//
//   }
//   // checking if X occupied 2 places
//   if(game.moveCount>2){
//     // see if we can win in this move, i.e. do we already have two in a row somewhere
//     // [0,1,2]
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[1] === game.humanPlayer && game.gameBoard[2] === null){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[1] === null && game.gameBoard[2] === game.humanPlayer){
//       $('#1').html("O");
//       game.gameBoard[1] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[1] === game.humanPlayer && game.gameBoard[2] === game.humanPlayer){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[3,4,5]
//     if(game.gameBoard[3] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[5] === null){
//       $('#5').html("O");
//       game.gameBoard[5] = "O";
//       return;
//     }
//     if(game.gameBoard[3] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[5] === game.humanPlayer){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[3] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[5] === game.humanPlayer){
//       $('#3').html("O");
//       game.gameBoard[3] = "O";
//       return;
//     }
//     //[6,7,8]
//     if(game.gameBoard[6] === game.humanPlayer && game.gameBoard[7] === game.humanPlayer && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[6] === game.humanPlayer && game.gameBoard[7] === null && game.gameBoard[8] === game.humanPlayer){
//       $('#7').html("O");
//       game.gameBoard[7] = "O";
//       return;
//     }
//     if(game.gameBoard[6] === null && game.gameBoard[7] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     //[0,3,6]
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[3] === game.humanPlayer && game.gameBoard[6] === null){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[3] === null && game.gameBoard[6] === game.humanPlayer){
//       $('#3').html("O");
//       game.gameBoard[3] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[3] === game.humanPlayer && game.gameBoard[6] === game.humanPlayer){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[1,4,7]
//     if(game.gameBoard[1] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[7] === null){
//       $('#7').html("O");
//       game.gameBoard[7] = "O";
//       return;
//     }
//     if(game.gameBoard[1] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[7] === game.humanPlayer){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[1] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[7] === game.humanPlayer){
//       $('#1').html("O");
//       game.gameBoard[1] = "O";
//       return;
//     }
//     //[2,5,8]
//     if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[5] === game.humanPlayer && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[5] === null && game.gameBoard[8] === game.humanPlayer){
//       $('#5').html("O");
//       game.gameBoard[5] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === null && game.gameBoard[5] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//     //[0,4,8]
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[8] === null){
//       $('#8').html("O");
//       game.gameBoard[8] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[8] === game.humanPlayer){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[0] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[8] === game.humanPlayer){
//       $('#0').html("O");
//       game.gameBoard[0] = "O";
//       return;
//     }
//     //[2,4,6]
//     if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[4] === game.humanPlayer && game.gameBoard[6] === null){
//       $('#6').html("O");
//       game.gameBoard[6] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === game.humanPlayer && game.gameBoard[4] === null && game.gameBoard[6] === game.humanPlayer){
//       $('#4').html("O");
//       game.gameBoard[4] = "O";
//       return;
//     }
//     if(game.gameBoard[2] === null && game.gameBoard[4] === game.humanPlayer && game.gameBoard[6] === game.humanPlayer){
//       $('#2').html("O");
//       game.gameBoard[2] = "O";
//       return;
//     }
//   }
//
//   // take center square if empty
//   if( !game.gameBoard[4] ){
//     $('#4').html("O");
//     game.gameBoard[4] = "O";
//     return;
//   }
//   // take top left corner if empty
//   if( !game.gameBoard[0] ){
//     $('#0').html("O");
//     game.gameBoard[0] = "O";
//     return;
//   }
//   // take bottom right corner if empty
//   if( !game.gameBoard[8] ){
//     $('#8').html("O");
//     game.gameBoard[8] = "O";
//     return;
//   }
//   // take top right corner if empty
//   if( !game.gameBoard[2] ){
//     $('#2').html("O");
//     game.gameBoard[2] = "O";
//     return;
//   }
//   // take bottom left corner if empty
//   if( !game.gameBoard[6] ){
//     $('#6').html("O");
//     game.gameBoard[6] = "O";
//     return;
//   }
//
// };
//
