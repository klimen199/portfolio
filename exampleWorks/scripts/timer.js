"use strict";
(function () {
    let dayElem = getId('day'),
        hourElem = getId('hour'),
        minElem = getId('min'),
        secElem = getId('sec'),
        endTime = new Date(2017,11,12,0,0),
        forDay = 1000*60*60*24,
        forHour = 1000*60*60,
        forMin = 1000*60;

    function dateLeft() {
        let nowTime = new Date(),
            leftTime = endTime-nowTime,
            leftDay = Math.floor(leftTime/forDay);
        leftTime -=leftDay*forDay;
        let leftHour = Math.floor(leftTime/forHour);
        leftTime -=leftHour*forHour;
        let leftMin = Math.floor(leftTime/forMin);
        leftTime -=leftMin*forMin;
        let leftSec = Math.floor(leftTime/1000);
        printLeftTime(leftDay,leftHour,leftMin,leftSec);
    }
    function printLeftTime(day,hour,min,sec) {
        dayElem.innerHTML = day;
        hourElem.innerHTML = hour;
        minElem.innerHTML = min;
        secElem.innerHTML = sec;
    }
    let timer = setInterval(dateLeft,1000);
})();