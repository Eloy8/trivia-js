exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function () {
  var players = new Array();
  var places = new Array(6);
  var purses = new Array(6);
  var inPenaltyBox = new Array(6);

  var startingNumber = 1;
  var popQuestionNumber = startingNumber;
  var scienceQuestionNumber = startingNumber;
  var sportsQuestionNumber = startingNumber;
  var rockQuestionNumber = startingNumber;

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function () {
    var playerHasAFullPurse = purses[currentPlayer] == 6;
    return playerHasAFullPurse;
  };

  var howManyPlayers = function () {
    return players.length;
  };

  var currentCategory = function () {
    switch (places[currentPlayer]) {
      case 0:
      case 4:
      case 8:
        return "Pop";
      case 1:
      case 5:
      case 9:
        return "Science";
      case 2:
      case 6:
      case 10:
        return "Sports";
      default:
        return "Rock";
    }
  };

  var addCoinToPlayerPurse = function () {
    purses[currentPlayer] += 1;
    console.log(
      players[currentPlayer] +
        " now has " +
        purses[currentPlayer] +
        " Gold Coins."
    );
  };

  var handleNextPlayerTurn = function () {
    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
  };

  this.add = function (playerName) {
    players.push(playerName);
    var playerIndex = howManyPlayers() - 1;
    places[playerIndex] = 0;
    purses[playerIndex] = 0;
    inPenaltyBox[playerIndex] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);
  };

  var askQuestion = function () {
    switch (currentCategory()) {
      case "Pop":
        console.log("Pop Question " + popQuestionNumber);
        break;
      case "Science":
        console.log("Science question " + scienceQuestionNumber);
        break;
      case "Sports":
        console.log("Sports question " + sportsQuestionNumber);
        break;
      case "Rock":
        console.log("Rock question " + rockQuestionNumber);
        break;
      default:
        console.log("Error: unknown category");
        break;
    }
  };

  this.roll = function (roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(
          players[currentPlayer] + " is getting out of the penalty box"
        );
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(
          players[currentPlayer] + "'s new location is " + places[currentPlayer]
        );
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(
          players[currentPlayer] + " is not getting out of the penalty box"
        );
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(
        players[currentPlayer] + "'s new location is " + places[currentPlayer]
      );
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function () {
    var playerRemainsInPenaltyBox =
      inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox;
    if (playerRemainsInPenaltyBox) {
      handleNextPlayerTurn();
      return false;
    }
    console.log("Answer was correct!!!!");
    addCoinToPlayerPurse();
    var winner = didPlayerWin();

    handleNextPlayerTurn();

    return winner;
  };

  this.wrongAnswer = function () {
    console.log("Question was incorrectly answered");
    console.log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    handleNextPlayerTurn();
    return false;
  };
};

var weHaveAWinner = false;
var game = new Game();

game.add("Chet");
game.add("Pat");
game.add("Sue");

do {
  var calculateRandomRollNumber = Math.floor(Math.random() * 6) + 1;
  game.roll(calculateRandomRollNumber);

  var calculateRandomWrongChance = Math.floor(Math.random() * 10) == 7;
  if (calculateRandomWrongChance) {
    weHaveAWinner = game.wrongAnswer();
  } else {
    weHaveAWinner = game.wasCorrectlyAnswered();
  }
} while (!weHaveAWinner);
