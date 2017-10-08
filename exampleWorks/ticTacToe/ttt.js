"use strict";
(function () {
    let winCombinations=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ],
        win,
        turn = 1,
        winner,
        stillPlaying = true,
        playerXsteps = [],
        playerOsteps = [],
        ticTacResult = {X: 0, O: 0, draw: 0},
        ticTacReset = getId('reset'),
        ticTacResultHTML = getClass('ticTacResult'),
        ceils = getClass('XOceil'),
        playerTurn = getId('turn');

    ticTacReset.onclick = newGame;

    for (let i=0;i<ceils.length;i++){
        ceils[i].onclick = makeCeilSelected;
    }
    function changePlayer(player) {
        playerTurn.innerHTML = 'Ходит <strong>' + player + '</strong>';
    }
    function makeCeilSelected() {
        if(!this.innerHTML && stillPlaying) {
            if(turn%2 == 0){
                this.innerHTML = 'O';
                playerOsteps.push(this.getAttribute('datatype'));
                changePlayer('X');
            }
            else{
                this.innerHTML = 'X';
                playerXsteps.push(this.getAttribute('datatype'));
                changePlayer('O');
            }
            turn++;
            checking();
            if(winner)
                gameEnd(winner);
        }


    }
    function checking() {
        if (turn >= 6){
            if(turn%2 == 0)
                winner = checkWin(playerXsteps, 'X'); // check playerX win
            else
                winner = checkWin(playerOsteps, 'O'); //// check playerO win
        }
        if(turn == 10  && !winner)
            winner = 'draw';
    }
    function gameEnd(winnerName) {
        stillPlaying = false;
        if(winnerName == 'draw')
            playerTurn.innerHTML = 'НИЧЬЯ';
        else
            playerTurn.innerHTML = 'ПОБЕДИЛ: <strong>' + winnerName + '</strong>';
        ticTacResult[winnerName]++;
        switch (winnerName){
            case 'X':{
                ticTacResultHTML[0].innerHTML = ticTacResult.X;
                break;
            }
            case 'O':{
                ticTacResultHTML[1].innerHTML = ticTacResult.O;
                break;
            }
            case 'draw':{
                ticTacResultHTML[2].innerHTML = ticTacResult.draw;
                break;
            }
        }
    }
    function newGame() {
        for (let i = 0; i<ceils.length;i++){
            ceils[i].innerHTML = '';
        }
        turn = 1;
        stillPlaying = true;
        playerXsteps = [];
        playerOsteps = [];
        playerTurn.innerHTML = 'Ходит <strong>X</strong>';
        winner = null;

    }
    function checkWin(steps, playerName) {
        winCombinations.some(function (combination) {
            win = combination.every(function (combElem) {
                for(let i=0; i<steps.length;i++){
                    if (combElem == steps[i])
                        return true;
                }
                return false;
            });
            if (win){
                return true;
            }
        });
        if (win)
            return playerName;

    }

})();
