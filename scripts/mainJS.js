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
    displayWorks();

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
        blockRowPrev;

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
            let cur = getId(val);
            if(!cur.classList.contains('init')){
                let js = document.createElement('script');
                let css = document.createElement('link');
                css.rel = 'stylesheet';
                if(val == 'view1' || val == 'view2'){
                    js.src='exampleWorks/scripts/view.js';
                    css.setAttribute('href','exampleWorks/styles/view.css');
                }
                else{
                    js.src='exampleWorks/scripts/'+val+'.js';
                    css.setAttribute('href','exampleWorks/styles/'+val+'.css');
                }
                cur.appendChild(js);
                cur.appendChild(css);
                cur.classList.add('init');
            }
            selectedWork = cur.cloneNode(true);

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

