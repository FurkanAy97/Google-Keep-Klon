let titles = [];
let notes = [] ;
let trashTitle = [];
let trashNote = [];

load();

function render(){
    let notesArea = document.getElementById('notes-area');
    let noticeArea = document.getElementById('notice-area');
    notesArea.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];
        notesArea.innerHTML += htmlTemplate(i);
        }
    
    if (notesArea.innerHTML) {
        noticeArea.innerHTML = '';
    } else {
        noticeArea.innerHTML = `<h2>Keine Notizen</h2>`;
    }
        
}
        



function htmlTemplate(i){
    return `
            <div class="note-card">
                <div class="note-card-top"> <b>${titles[i]}</b></div>
                    <div class="note-card-bottom">${notes[i]}</div>
                        <div class="delete-button" id="delete-button">
                            <a href="#" onclick="deleteNote(${i})">
                                <img src="icons/delete-24.ico" alt="">
                            </a>
                        </div>
            </div> `;
}


function renderTrash(){
    let trashArea = document.getElementById('trash-area');
    let noticeArea = document.getElementById('notice-area');
    trashArea.innerHTML = '';
    for (let i = 0; i < trashTitle.length; i++) {
        trashArea.innerHTML += trashHtmlTemplate(i);
    }
    if (trashArea.innerHTML) {
        noticeArea.innerHTML = '';
    } else {
        noticeArea.innerHTML = `
            <h2>Keine Notizen im Papierkorb</h2>`;
    }
}


function trashHtmlTemplate(i) {
    return `
    <div class="note-card">
    <div class="note-card-top"> <b>${trashTitle[i]}</b></div>
    <div class="note-card-bottom">${trashNote[i]}</div>
        <div class="button-container">
            <div class="restore-button" id="restore-button">
                <a href="#" onclick="restoreNote(${i})">
                    <img src="icons/undo-4-24.ico">
                </a>
            </div>
            <div class="delete-button" id="delete-button">
                <a href="#" onclick="deleteNotePermanently(${i})">
                    <img src="icons/delete-24.ico">
                </a>
            </div>
        </div>
    </div>`;
}


function addNote() {
    let newTitle = document.getElementById('title-input');
    let newNote = document.getElementById('note-input');
    if (document.getElementById('title-input').value == 0) {
        alert('Bitte Titel eingeben');
            } else if (document.getElementById('note-input').value == 0){
                alert('Bitte Notiz eingeben') } else {
                    pushArray(newTitle, newNote);
                }
}


function pushArray(newTitle, newNote){
    titles.push(newTitle.value);
    notes.push(newNote.value);
    render();
    save()
    newTitle.value = ``;
    newNote.value = ``;
}


function deleteNote(i){
    trashTitle.push(titles[i]);
    titles.splice(i, 1);
    trashNote.push(notes[i]);
    notes.splice(i, 1);
    render();
    save();
}


function deleteNotePermanently(i){
    trashTitle.splice(i, 1);
    trashNote.splice(i, 1);
    renderTrash();
    save();
}

function restoreNote(i){
    titles.push(trashTitle[i]);
    notes.push(trashNote[i]);
    trashTitle.splice(i, 1);
    trashNote.splice(i, 1);
    renderTrash();
    save();
}


function save(){
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    let trashTitleAsText = JSON.stringify(trashTitle);
    let trashNoteAsText = JSON.stringify(trashNote);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('trashTitle', trashTitleAsText);
    localStorage.setItem('trashNote', trashNoteAsText);
}


function load(){
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    let trashTitleAsText = localStorage.getItem('trashTitle');
    let trashNoteAsText = localStorage.getItem('trashNote');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
        trashTitle = JSON.parse(trashTitleAsText);
        trashNote = JSON.parse(trashNoteAsText);
    }
}