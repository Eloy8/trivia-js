require("./game.js");

describe("The test environment", function () {
  it("should pass", function () {
    expect(true).toBe(true);
  });

  it("should access game", function () {
    expect(Game).toBeDefined();
  });
});

describe("The Game object method: ", function () {
  let game;
  let firstPlayer = "TestPerson1";

  beforeEach(() => {
    console.log = jasmine.createSpy("log");
    game = new Game();

    game.addPlayer("TestPerson1");
    game.addPlayer("TestPerson2");
    game.addPlayer("TestPerson3");
  });
  afterEach(() => {
    originalLogFunc = undefined;
    console.log = originalLogFunc;
  });

  it("addPlayer should add a player", function () {
    var playerNumber = 4;
    var testPlayerName = "TestPerson" + playerNumber;

    game.addPlayer("TestPerson4");
    expect(console.log).toHaveBeenCalledWith(testPlayerName + " was added");
    expect(console.log).toHaveBeenCalledWith(
      "They are player number " + playerNumber
    );
  });

  it("roll should be able to handle a even roll", function () {
    let evenRoll = 2;
    game.roll(evenRoll);
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + " is the current player"
    );
    expect(console.log).toHaveBeenCalledWith("They have rolled a " + evenRoll);
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + "'s new location is " + evenRoll
    );
  });
  it("roll should be able to handle a uneven roll", function () {
    let unEvenRoll = 1;
    game.roll(unEvenRoll);
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + " is the current player"
    );
    expect(console.log).toHaveBeenCalledWith(
      "They have rolled a " + unEvenRoll
    );
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + "'s new location is " + unEvenRoll
    );
  });

  it("wrongAnswer should handle a wrong answer", function () {
    var weHaveAWinner = game.wrongAnswer();
    expect(weHaveAWinner).toBe(false);
    expect(console.log).toHaveBeenCalledWith(
      "Question was incorrectly answered"
    );
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + " was sent to the penalty box"
    );
  });
  it("wasCorrectlyAnswered should handle a correct answer", function () {
    var weHaveAWinner = game.wasCorrectlyAnswered();
    // No players have won because the game has just been initialized,
    expect(weHaveAWinner).toBe(false);
    expect(console.log).toHaveBeenCalledWith("Answer was correct!!!!");
    expect(console.log).toHaveBeenCalledWith(
      firstPlayer + " now has 1 Gold Coins."
    );
  });
});
