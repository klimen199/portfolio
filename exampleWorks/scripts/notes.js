"use strict";
(function (){
    let notesInp = getId('notesInp'),
        notes = getId('notes');

    notesInp.onkeyup = function (e) {
        let val = notesInp.value;
        if (e.keyCode == '13' && val.trim() != '') {
            addNote(val);
            notesInp.value = '';
        }
    };
    function addNote(text) {
        notes.insertBefore(createNote(text), notesInp.nextElementSibling);
    }
    notes.onclick = function (e) {
        if (e.target.className == 'noteDelBtn'){
            notes.removeChild(e.target.parentElement);
        }
        if(e.target.className == 'noteCheckbox'){
            e.target.style.visibility = 'hidden';
            e.target.parentElement.classList.add('madeNote');
        }
    };
    function createNote(text) {
        let elem = document.createElement('div');
        elem.innerHTML = '<button class="noteDelBtn">x</button>'
            + '<input type="checkbox" class="noteCheckbox">'
            + '<span class="noteTxt">' + text + '</span>';
        elem.classList.add('noteItem');
        return elem;
    }
})();