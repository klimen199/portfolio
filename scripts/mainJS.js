"use strict";
let count =0,
    arrBacksLen,
    backTimer;

window.addEventListener('load', function () {

    //  background slider
    backTimer = setInterval(changeBack(),7000);
    getId('menuFooter').onclick = function () {
        $('#menuContent').slideToggle(500);
    };
    getId('prevSl').onclick = function () {
        count-=2;
        userChangeBack()
    };
    getId('nextSl').onclick = function () {
        userChangeBack()
    };

    //  menu
    document.querySelector('#menuContent > ul').onclick = function (e) {
        let elem = e.target.classList;
        let curClass;
        elem.forEach(function (el) {
            if (el.indexOf('show-') == 0)
                curClass = el.substr(-1);
        });
        $('#content > div')
            .hide()
            .eq(curClass)
            .fadeIn(1500);

    };







    //  up-down buttons
    getId('down').onclick = function () {
        window.scrollTo(0,document.body.scrollHeight)
    };
    getId('up').onclick = function () {
        window.scrollTo(0,0)
    };

    // display portfolio works
    if ("import" in document.createElement("link")){
        console.log('with import');
        displayWorks();
    }
    else{
        console.log('without import');
        window.addEventListener('WebComponentsReady', displayWorks);
    }

    //  clocks
    let clockElem = getId('clock');
    setInterval(currentTime,1000);
    function currentTime() {
        let now = new Date();
        clockElem.innerHTML = checkDateFormat(now.getHours()) +
            ':' + checkDateFormat(now.getMinutes()) +
            ':' + checkDateFormat(now.getSeconds());
    }




});


    // background slider
function userChangeBack() {
    if (count<0) count+=arrBacksLen;
    clearInterval(backTimer);
    setTimeout(changeBack(),0);
    backTimer = setInterval(changeBack(),7000);
}
function changeBack() {
    let backsNum = getClass("background").length,
        arrBacks = ['back1.jpg', 'back2.jpg','back3.jpg','back4.jpg','back5.jpg','back6.jpg'];
    arrBacksLen = arrBacks.length;
    return function () {
        $('.background').eq(count%backsNum)
            .css({
                background:'url("img/back/'+arrBacks[++count%arrBacksLen]+'") no-repeat center top'
            })
            .fadeIn()
            .end()
            .eq(count%backsNum)
            .fadeOut(1000);
    };
}

    // for displaying portfolio works
function displayWorks() {
    let show2Elem = getId('show2'),
        exIcons = $('div.show-2 > .exampleIcon'),
        exIconsLast = exIcons.length-1,
        blockRowPrev,
        worksArr =[];

    initImports(worksArr);
    let worksNum = worksArr.length;
    let newElem = document.createElement('div');
    newElem.classList.add('examples');
    newElem.setAttribute('background-color','green');

    show2Elem.addEventListener('click', display);

    function display(e) {
        let div = e.target.closest('div.exampleIcon');
        if(div){
            let jqDiv = $(div),
                jqNewElem = $(newElem),
                containerW = show2Elem.offsetWidth,
                blockW = jqDiv.outerWidth(true),
                blocksInLine = Math.floor(containerW/blockW),
                selectedBlock = jqDiv.index('div.show-2 > .exampleIcon'),
                blockRow = Math.ceil((selectedBlock+1)/blocksInLine),
                insertAfterBlock = blockRow*blocksInLine -1,
                selectedWork;
            let removes = 0,
                isOneSelected = 0;
            if (insertAfterBlock > exIconsLast) insertAfterBlock = exIconsLast;
            exIcons.not(exIcons[selectedBlock]).each(function (i,elem) {
                if($(elem).hasClass('selected')){
                    removes++;
                    $(elem).removeClass('selected');
                }
            });
            jqDiv.toggleClass('selected');
            if(jqDiv.hasClass('selected')) isOneSelected++;

            let val = jqDiv.attr('data-ex');

            for (let i =0; i < worksNum;i++){
                if(worksArr[i].getAttribute('data-ex') == val){
                    selectedWork = worksArr[i];
                    break;
                }
            }
            jqNewElem.html(selectedWork);
            if (removes == 0 && isOneSelected == 0) jqNewElem.slideUp(1000);
            if (removes != 0 && isOneSelected == 1) jqNewElem.hide();
            $('div.exampleIcon').eq(insertAfterBlock).after(newElem);
            if ((isOneSelected == 1 && removes == 0) || blockRow != blockRowPrev) jqNewElem.slideDown(1000);
            if (removes != 0 && isOneSelected == 1) jqNewElem.show();
            blockRowPrev = blockRow;
        }
    }
}
// function addImport(val, arr) {
//     if(!addImport.cache[val]){
//         let link = document.createElement('link');
//         link.setAttribute('rel','import');
//         $(link).attr()
//         link.setAttribute({'rel':'import','href':'exampleWorks/'+val+'/'+val+'.html'})
//     }
// }
function initImports(arr) {
    arr.push(document.querySelector('link#work1').import.querySelector('#notes'));
    arr.push(document.querySelector('link#work2').import.querySelector('#timer'));
    arr.push(document.querySelector('link#work3').import.querySelector('#calculator'));
    arr.push(document.querySelector('link#work4').import.querySelector('#calendar'));
    arr.push(document.querySelector('link#work5').import.querySelector('#gameNumbers'));
    arr.push(document.querySelector('link#work6').import.querySelector('#tic-tac-toe'));
    arr.push(document.querySelector('link#work7').import.querySelector('#interview1'));
    arr.push(document.querySelector('link#work8').import.querySelector('#interview2'));
}

    // clocks
function checkDateFormat(int) {
    let str = String(int);
    if (str.length == 1) str ='0'+str;
    return str;
}


function getId(id) {
    return document.getElementById(id);
}
function getClass(id) {
    return document.getElementsByClassName(id);
}

