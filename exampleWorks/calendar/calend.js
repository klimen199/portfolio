"use strict";
let now = new Date();
(function () {
    let curDay = now.getDate(),
        posCurDay,
        used = false,
        monthList = ['Январь','Февраль','Март','Апрель','Май','Июнь',
            'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        calendTop = getId('calendTop'),
        calendEl = getId('calendar'),
        dayCell,
        prevM = getId('prevM'),
        nextM = getId('nextM'),
        arrDayCell = [],
        clicks=0;

    (curDay==0)?curDay=6:curDay--;

    Date.prototype.isLeapYear = function () {
        return (this.getFullYear() % 4 == 0);
    };
    Date.prototype.daysInMonth = function (month) {
        let dL = [31,29,31,30,31,30,31,31,30,31,30,31],
            dNl= [31,28,31,30,31,30,31,31,30,31,30,31];
        if(!this.isLeapYear()){
            return dNl[month];
        }
        else{
            return dL[month];
        }
    };

    refreshY_M(calendTop);
    for (let i =0; i < 42;i++){
        dayCell = document.createElement('div');
        dayCell.classList.add('dayCell');
        calendEl.appendChild(dayCell);
        arrDayCell.push(dayCell);
    }
    fillCalendar(now,now.getMonth(),arrDayCell, clicks);

    prevM.onclick = function () {
        clicks--;
        let m = now.getMonth();
        if(m==0) m = 12;
        now.setMonth(--m);
        refreshY_M(calendTop);
        fillCalendar(now,m,arrDayCell,clicks);
    };
    nextM.onclick = function () {
        clicks++;
        let m = now.getMonth();
        if(m==11) m = -1;
        now.setMonth(++m);
        refreshY_M(calendTop);
        fillCalendar(now,m,arrDayCell,clicks);
    };

    function fillCalendar(date,m,cellArr, clicks) {
        let fWeekday = getFirstMonthWeekday(now.getFullYear(),now.getMonth()),
            daysInM = date.daysInMonth(m),
            i;
        (fWeekday == 0)?(fWeekday=6):(fWeekday--);
        for(i =0; i<fWeekday;i++){
            cellArr[i].innerHTML = ".";
        }
        if(!used) {
            posCurDay = fWeekday+curDay;
            used = true;
        }
        if(clicks == 0){
            cellArr[posCurDay].classList.add('selected');
        }
        else{
            cellArr[posCurDay].classList.remove('selected');
        }
        for (i =0; i < daysInM;i++){
            cellArr[fWeekday++].innerHTML = i+1;
        }
        if(fWeekday<=35){
            for(i =fWeekday; i<35;i++){
                cellArr[i].innerHTML = ".";
            }
            for(i =35; i<42;i++){
                cellArr[i].innerHTML = '';
            }
        }
        else{
            for(i =fWeekday; i<42;i++){
                cellArr[i].innerHTML = ".";
            }
        }
    }
    function getFirstMonthWeekday(y,m) {
        return (new Date(y,m,1)).getDay();
    }
    function refreshY_M(board) {
        board.innerHTML = getY_M();
    }

    function getY_M() {
        return now.getFullYear() + ' ' + monthList[now.getMonth()];
    }

})();

