const NoteTitle = document.getElementById("noteTitle");
const NoteInput = document.getElementById("noteInput");
const NoteList = document.getElementById("noteList");
const NoteForm = document.getElementById("noteForm");

let notes = [];

NoteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = NoteTitle.value.trim();
  const input = NoteInput.value.trim();

  if (title && input) {
    notes.push({ title, input });

    localStorage.setItem("notes", JSON.stringify(notes));

    createNote(title, input);

    NoteForm.reset();
  }
});

function createNote(title, input) {
  const li = document.createElement("li");
  li.className = "note";
  li.style.backgroundColor =
    "#" + Math.floor(Math.random() * 16777215).toString(16);
  li.style.padding = "20px";
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

  li.appendChild(delBtn);
  NoteList.appendChild(li);
}

window.onload = function () {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

  notes = savedNotes;

  savedNotes.forEach((note) => {
    createNote(note.title, note.input);
  });
};
