"use strict";
(function () {
    let calcBoard = getId('calcBoard'),
        calcBtns = getClass('calcBtn');

    for(let i =0; i < calcBtns.length;i++){
        if (calcBtns[i].innerHTML == 'c')
            calcBtns[i].onclick = clearCalcInput;
        else if ( calcBtns[i].innerHTML == '=')
            calcBtns[i].onclick = getCalcRezult;
        else
            calcBtns[i].onclick = calcBtnClick;
    }
    function clearCalcInput() {
        calcBoard.value = '';
    }
    function calcBtnClick() {
        calcBoard.value += this.innerHTML;
    }
    function getCalcRezult() {
        let arr = [];
        arr = readInputContent(calcBoard.value);
        arr = checkInputContent(arr);
        arr = calculatingStage(calculatingStage(arr, 'first'), 'second');
        calcBoard.value = arr;
    }
    function readInputContent(content) {
        let readContent = [];
        let i =0;
        let isBegin = true;
        for (let sumb of content){
            if (sumb != '+' && sumb != '-' && sumb != '*' && sumb != '/'){
                isBegin = false;
                if(readContent[i] == undefined) readContent[i] = sumb;
                else readContent[i] += sumb;
            }
            else if(!isBegin){
                readContent[++i] = sumb;
                i++;
            }
        }
        return readContent;
    }
    function checkInputContent(content) {
        let lastElem;
        for (let i=0; i<content.length;i++){
            if (content[i] == undefined){
                content.splice(i,2);
                i--;
            }
        }
        lastElem = content.length -1;
        while (content[lastElem] == undefined || content[lastElem] == '+' || content[lastElem] == '-' || content[lastElem] == '*' || content[lastElem] == '/'){
            content.pop();
            lastElem--;
        }
        return content;
    }
    function calculatingStage(arr, stage) {
        for(let i = 1; i <arr.length;i += 2){
            if (stage == 'first' &&(arr[i] == '*' || arr[i] == '/') ||
                stage == 'second' && (arr[i] == '+' || arr[i] == '-')){
                arr[i-1] = calculating(arr[i-1], arr[i], arr[i+1]);
                arr.splice(i,2);
                i-=2;
            }
        }
        return arr;
    }
    function calculating(fNum, arifmSign, sNum) {
        let num1 = parseFloat(fNum), num2 = parseFloat(sNum);
        switch (arifmSign){
            case '*':{
                return num1 * num2;
            }
            case '/':{
                return num1 / num2;
            }
            case '+':{
                return num1 + num2;
            }
            case '-':{
                return num1 - num2;
            }
            default: alert('Error in calculating');
        }
    }
})();