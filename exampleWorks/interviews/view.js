(function () {

    // jsTest
    let jsTestForms = getClass('jsTest');
    getId('jsTestBtn').onclick = function () {
        jsTestCheck(jsTestForms);
    };

    //jsTest2
    let curQuest =0,
        jsTestForms2 = getClass('jsTest2'),
        jsTestBtn2 = getId('jsTestBtn2'),
        jsTestAgainBtn2 = getId('jsTestAgainBtn2'),
        jsTestQuest2 = getClass('int2'),
        numQuest2 = jsTestQuest2.length,
        jsTestNextBtn2 = getId('jsTestNextBtn2');
    jsTestBtn2.onclick = function () {
        jsTestCheck(jsTestForms2);
        jsTestQuest2[curQuest].style.display = 'none';
        jsTestAgainBtn2.style.display='block';
        jsTestBtn2.style.display = 'none';
    };
    jsTestAgainBtn2.onclick =function () {
        curQuest =0;
        jsTestAgainBtn2.style.display='none';
        jsTestBtn2.style.display = 'none';
        jsTestQuest2[curQuest].style.display = 'block';
        jsTestNextBtn2.style.display = 'inline';
        $('#interview2 input:checked').prop('checked',false);
    };
    jsTestNextBtn2.onclick = function () {
        if(curQuest < numQuest2-1){
            jsTestQuest2[++curQuest].style.display = 'block';
            jsTestQuest2[curQuest-1].style.display = 'none';
        }
        if(curQuest == numQuest2-1){
            jsTestBtn2.style.display = 'inline';
            jsTestNextBtn2.style.display = 'none';
        }
    };


    function jsTestCheck(forms) {
        let jsTestRez = [],
            formsNum = forms.length,
            rightAnsw =0;
        for (i=0; i<formsNum;i++){
            for (j=0;j<forms[i].elements.length;j++){
                if(forms[i].elements[j].checked){
                    jsTestRez.push(forms[i].elements[j].dataset.truth);
                    break;
                }
            }
        }
        jsTestRez.forEach(function (elem) {
            if (elem == 'true')
                rightAnsw++;
        });
        alert('Правильно: ' + (rightAnsw/formsNum*100).toFixed(2) + '% (' + rightAnsw + '/' + formsNum+')');
        $('#interview1 input:checked').prop('checked',false);
    }
})();

