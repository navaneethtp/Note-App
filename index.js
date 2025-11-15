const NoteTitle = document.getElementById("noteTitle");
const NoteInput = document.getElementById("noteInput");
const NoteList = document.getElementById("noteList");
const NoteForm = document.getElementById("noteForm");

let notes = [];
let editingNote = null;

function createNote(title, input) {
  const li = document.createElement("li");
  li.className = "note";
  li.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
  li.innerHTML = `<h3>${title}</h3><p>${input}</p>`;


  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.classList.add("delete-btn");
  const img = document.createElement("img");
  img.className = "delete-icon";
  img.src = "images/remove.png";
  img.alt = "Delete Note";
  delBtn.appendChild(img);
  delBtn.addEventListener("click", () => {
    li.remove();
    notes = notes.filter((n) => !(n.title === title && n.input === input));
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", () => {
    
    NoteTitle.value = title;
    NoteInput.value = input;

  
    editingNote = { oldTitle: title, oldInput: input };
  });

  li.appendChild(delBtn);
  li.appendChild(editBtn);
  NoteList.appendChild(li);
}

NoteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = NoteTitle.value.trim();
  const input = NoteInput.value.trim();
  if (!title || !input) return;


  if (editingNote) {
  
    notes = notes.filter(
      (n) =>
        !(n.title === editingNote.oldTitle && n.input === editingNote.oldInput)
    );

  
    notes.push({ title, input });
    localStorage.setItem("notes", JSON.stringify(notes));

  
    NoteList.innerHTML = "";
    notes.forEach((n) => createNote(n.title, n.input));

    editingNote = null; 
  }
  else {
    notes.push({ title, input });
    localStorage.setItem("notes", JSON.stringify(notes));
    createNote(title, input);
  }

  NoteForm.reset();
});

window.onload = function () {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = savedNotes;
  savedNotes.forEach((note) => createNote(note.title, note.input));
};
