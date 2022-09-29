var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

//this will track the note
var activeNote = {};

//gets all notes from db
var getNotes = function () {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

//saves the note to the db
var saveNote = function (note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

//deletes the note from the db
var deleteNote = function (id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

//displays the current note if not displays an empty one
var renderActiveNote = function () {
  $saveNoteBtn.hide();

  if (typeof activeNote.id === "number") {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

//gets the saved note data and updates the table
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };

  saveNote(newNote);
  getAndRenderNotes();
  renderActiveNote();
};

//delete note after click
var handleNoteDelete = function (event) {
  event.stopPropagation();

  var note = $(this).data("id");

  if (activeNote.id === note) {
    activeNote = {};
  }

  deleteNote(note);
  getAndRenderNotes();
  renderActiveNote();
};

//sets the active note
var handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

//replaces the note so you can enter a new one
var handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

//hides save btn if there is nothing to save or show it if there is
var handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

//the table shows the list of note titles
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    $li.data("id", i);

    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id=" +
        i +
        ">"
    );

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

//after the note has been sent to the database, it is rendered in the table on the side of the screen
var getAndRenderNotes = function () {
  return getNotes().then(function (data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

//inits the notes
getAndRenderNotes();
