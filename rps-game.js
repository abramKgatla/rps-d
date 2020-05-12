class RpsGame {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.playerNum = 0;


        p2.emit("message", "Game Starting!")
            //message to player 1
        p1.emit("message", "Game Starting!")
            //[p1, p2].forEach(s => s.emit("message","Game Starting"));
        p1.on("turn", (turn) => {
            let _action = turn;
            this.playerNum = 1;
            //p1.emit("message", `you played ${_action}`);
            this.playerSensor(_action);
            //this.winnerCalc();
        });
        p2.on("turn", (turn) => {
            let _action = turn;
            this.playerNum = 2;
            this.playerSensor(_action);
            //this.winnerCalc();
        })



    }


    playerSensor(_action) {
            //player 1 action
            if (this.playerNum == 1) {
                console.log("turn 1 captured", _action);
                this.p1.emit("message", `you played ${_action}`);
                this.p1Action = _action;
                console.log(this.p1Action)
                console.log(this.p2Action)

                //choosing winner if player1 was last
                if (this.p1Action == this.p2Action) {
                    this.playersDraw()
                        //reset actions



                } else if (this.p1Action == "rock" && this.p2Action == "paper") {
                    //p1 rock vs p2 paper
                    this.player2Wins();

                } else if (this.p1Action == "paper" && this.p2Action == "rock") {
                    //p1 paper vs p2 rock
                    this.player1Wins();

                } else if (this.p1Action == "scissors" && this.p2Action == "rock") {
                    //p1 scissors vs p2 rock
                    this.player2Wins();

                } else if (this.p1Action == "rock" && this.p2Action == "scissors") {
                    //p1 rock vs p2 scissors
                    this.player1Wins();

                } else if (this.p1Action == "paper" && this.p2Action == "scissors") {
                    //p1 paper vs p2 scissors
                    this.player2Wins();

                } else if (this.p1Action == "scissors" && this.p2Action == "paper") {
                    //p1 scissors vs p2 paper
                    this.player1Wins();
                }
                ////////////////////////////////////////////////////
                //player 2 action
            } else if (this.playerNum == 2) {
                console.log("turn 2 captured", _action);
                this.p2.emit("message", `you played ${_action}`);
                this.p2Action = _action
                console.log(this.p1Action)
                console.log(this.p2Action)

                //choosing winner if player2 was last
                if (this.p1Action == this.p2Action) {

                    this.playersDraw()
                        //reset actions

                } else if (this.p1Action == "rock" && this.p2Action == "paper") {
                    //p1 rock vs p2 paper
                    this.player2Wins();

                } else if (this.p1Action == "paper" && this.p2Action == "rock") {
                    //p1 paper vs p2 rock
                    this.player1Wins();

                } else if (this.p1Action == "scissors" && this.p2Action == "rock") {
                    //p1 scissors vs p2 rock
                    this.player2Wins();

                } else if (this.p1Action == "rock" && this.p2Action == "scissors") {
                    //p1 rock vs p2 scissors
                    this.player1Wins();


                } else if (this.p1Action == "paper" && this.p2Action == "scissors") {
                    //p1 paper vs p2 scissors
                    this.player2Wins();

                } else if (this.p1Action == "scissors" && this.p2Action == "paper") {
                    //p1 scissors vs p2 paper
                    this.player1Wins();
                }
            }
        }
        //when players make same option
    playersDraw() {
            console.log("it's a draw")
            this.p2.emit("message", "it's a draw")
            this.p1.emit("message", "it's a draw")
                //reset actions
            this.p1Action = null;
            this.p2Action = null;
            this.p2.emit("message", "Next Round!!")
            this.p1.emit("message", "Next Round!!")
        }
        //when player 1 wins
    player1Wins() {
        console.log("player 1 wins");
        this.p2.emit("message", `Opponent selected ${this.p1Action} you Loose!`);
        this.p1.emit("message", `Opponent selected ${this.p2Action} you Win!`);
        //reset actions
        this.p1Action = null;
        this.p2Action = null;
        this.p2.emit("message", "Next Round!!")
        this.p1.emit("message", "Next Round!!")

    }
    player2Wins() {
        console.log("player 2 wins");
        this.p1.emit("message", `Opponent selected ${this.p2Action} you Loose!`);
        this.p2.emit("message", `Opponent selected ${this.p1Action} you Win!`);
        //reset actions
        this.p1Action = null;
        this.p2Action = null;
        this.p2.emit("message", "Next Round!!")
        this.p1.emit("message", "Next Round!!")
    }
}
//RpsGame class to server.js
module.exports = RpsGame;