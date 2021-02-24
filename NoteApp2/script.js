const btnAdd = document.querySelector('.add');


notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.innerHTML = `
    <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
        
    `;

    const btnEdit = note.querySelector('.edit');
    const btnDel = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    btnEdit.addEventListener('click', () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle('hidden');
    });

    btnDel.addEventListener('click', () => {
        note.remove();
        UpdateLS();
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        UpdateLS();
    });

    document.body.appendChild(note);




}
btnAdd.addEventListener('click', () => {
    addNewNote();

})


function UpdateLS() {
    notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}







