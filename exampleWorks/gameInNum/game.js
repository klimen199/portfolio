"use strict";
(function () {
    let gTimer,
        beginNumGame = getId('beginGameNumbers'),
        startNumGame = getId('startGameNumbers'),
        tableNumGame = getId('tableGameNumbers'),
        row =4,
        col =4,
        prevCell = 0,
        paused = false,
        timerEl = getId('timerGameNumbers');

    beginNumGame.onclick = function () {
        startNumGame.style.display = 'inline-block';
        beginNumGame.style.display = 'none';
        // tableNumGame.innerHTML = drawTable(row,col);
        drawTable(row,col,tableNumGame);
        console.dir(tableNumGame);
        fillTable(row,col,tableNumGame)
    };
    startNumGame.onclick = function () {
        clearTimeout(gTimer);
        fillTable(row,col,tableNumGame);
        prevCell = 0;
        paused = false;
    };
    tableNumGame.onclick =function (e) {
        if (e.target.tagName.toLowerCase() == 'td' && !paused){
            if(e.target.innerHTML == prevCell+1){
                e.target.style.backgroundColor = 'red';
                prevCell++;
                if (prevCell==row*col){
                    timerEl.innerHTML='<strong>WIN!</strong>';
                    clearInterval(gTimer);
                }
            }
        }
    };
    function timeLeft() {
        let time = 20;
        return function () {
            if (time == 0){
                clearInterval(gTimer);
                paused = true;
            }
            else{
                timerEl.innerHTML = --time;
            }
        };
    }
    function fillTable(row,col,tbl) {
        let tableCells = tbl.getElementsByTagName('td');
        for(let i =0; i < row*col; i++){
            tableCells[i].innerHTML = randomNum(row,col);
            getStyle(tableCells[i]);
        }
        gTimer = setInterval(timeLeft(), 1000);
    }

    function drawTable(row,col,tbl) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        for (let i =0; i<row;i++){
            let trClone = tr.cloneNode();
            for (let j =0; j < col;j++){
                trClone.appendChild(td.cloneNode());
            }
            tbl.appendChild(trClone);
        }
    }
    let arr = [],
        a;
    function randomNum(row,col) {
        if(arr.length == 0){
            let len = row*col;
            a = len;
            for(let i =0; i<len;i++){
                arr[i] = i+1;
            }
        }
        let n = numFromInterval(0,a-1);
        a--;
        let b = arr.splice(n,1);
        return b;
    }
    function numFromInterval(from,to) {
        return Math.floor(Math.random()*(to-from) + from);
    }
    function randomColor() {
        return 'rgb(' + numFromInterval(0, 255) + ',' +
            numFromInterval(0, 255) + ',' + numFromInterval(0, 255) + ')'
    }
    function getStyle(elem) {
        elem.style.cssText = 'color:'+randomColor()+';'
            + 'font-size:'+ numFromInterval(14,38)+'px;'
            + 'background-color: inherit;'
    }

})();


