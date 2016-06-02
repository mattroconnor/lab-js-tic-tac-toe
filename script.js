
/*
Turn progression:
1. Track current turn, X or O and display
2. Run click() function:
  2.1 Check if the space is currently marked:
    2.1.a1 If marked do nothing
    2.1.b1 If not marked add a mark to space depending on whose turn and set space to marked
    2.1.b2 Run function to check for winner (f3.2)
3. Stand alone functions:
  3.1 Clear the board:
    3.1.1 Erase all spaces
    3.1.2 Reset turn counter
  3.2 Winner()
    3.1.1 Check if any three are connected horizontally, vertically or diagonally (make these three child functions)
      3.1.1a If any is true declare winner and run clear the board (f3.1)
      3.1.1b If no winner increase the turn counter
*/

// var init = function(){
  // BEGIN game initialization and global variables
    var audio = new Audio("GoT.mp3") ;
    audio.play();
    var turnCounter = 0;
    var playerTurn = "";
    // Give every space a 'marked' counter
    $('td').attr('marked','no')
  // END game initialization

  // BEGIN turn progression logic

    // 1. Set and display current turn
    var setTurn = function(){
      if (turnCounter%2 === 0){
        playerTurn = "Starks";
      } else{
        playerTurn = "Lannisters";
      };
      $('#turnDisplay').html("It is "+ playerTurn + "' turn. Choose wisely.")
    };
    setTurn();

    // 2. Monitor for click
    $(function (onClick) {
      $('#westeros').on('click', function (e) {

        // This check is to ensure that once the image is placed in the td that a second click does not hit the image but rather still hits the td
        var clickedElement = $(e.target);
        if (clickedElement.is('img')){
          clickedElement = $(e.target).parent('td')
        };

        // 2.1 Check if space is currently marked
        var marked = clickedElement.attr('marked');
        if (marked === "yes"){
          // 2.1.a1 Do nothing
        } else{
          // 2.1.b1 Add a mark to space depending on whose turn, set space to marked and update class
          if (playerTurn == "Starks"){
            $(e.target).append('<img src="images/starks.jpg">')
            $(e.target).addClass('Starks');
          } else{
          $(e.target).append('<img src="images/lannisters.jpg">')
          $(e.target).addClass('Lannisters');
          }
          clickedElement.attr('marked','yes');
          // 2.1.b2 Run function to check for winner (f3.2)
          checkWinner();
          setTurn();
        };
      });
    });
  // END turn progression logic

  // BEGIN standalone functions area
    // 3.1 Clear the board on click
    $(function (clearBoard) {
      $('#reset').on('click', reset);
    });

    function reset() {
      // 3.1.1 Erase all spaces and set as unmarked
      $('td').empty();
      $('td').attr('marked','no')
      $('td').removeClass('Starks')
      $('td').removeClass('Lannisters')
      // 3.1.2 Reset turn counter
      turnCounter = 0;
      setTurn();
    };

    // 3.2 Determine Winner()
    var checkWinner = function(){
      // get array of spots owned by current player
      var playerArray = []
      $('.'+playerTurn).each(function(){
        playerArray.push($(this).attr('data-num'))
      })
      console.log(playerArray)

      if (playerArray.length >=3) {
        // Call seperate functions to check for winners vertically, horizontally or diagonally
        var vertical = winnerV(playerArray);
        var horizontal = winnerH(playerArray);
        var diagonal = winnerD(playerArray);

        if (vertical || horizontal || diagonal){
          // 3.1.1a If any is true declare winner and run clear the board (f3.1)
          alert(playerTurn+" have won the game!")
          reset()
        } else {
          // 3.1.1b If no winner increase turn
          turnCounter ++;
        }
      } else{
        turnCounter ++;
      };
    };

    var winnerV = function(playerArray){
      var winningArray = [["0","3","6"],["1","4","7"],["2","5","8"]]
      return checkArrays(playerArray,winningArray);
    }

    var winnerH = function(playerArray){
      var winningArray = [["0","1","2"],["3","4","5"],["6","7","8"]]
      return checkArrays(playerArray,winningArray);
    }

    var winnerD = function(playerArray){
      var winningArray = [["0","4","8"],["2","4","6"]]
      return checkArrays(playerArray,winningArray);
    }

    var checkArrays = function(playerArray,winningArray){

      var i = 0;
      var noWinner = true;
      while (noWinner && i < winningArray.length) {
        var noFalses = true;
        var x = 0;
        while (noFalses && (x < winningArray[i].length)){
          var indexSpot = playerArray.indexOf(winningArray[i][x]);
          if (indexSpot == -1){
            noFalses = false;
          }
          else {
            x ++;
          }
        }
        if (x === winningArray[i].length){
          noWinner = false;
          return true;
        }
        i ++;
      }
      return false;
    };
  // END standalone functions
// };