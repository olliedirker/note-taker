const fs = require("fs");
const path = require("path");

module.exports = (app) => {
//the notes var for parsing the data
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var notes = JSON.parse(data);
//api routes start

//GET all route
    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });

//POSTs a new note
    app.post("/api/notes", function (req, res) {
//makes sure the new note doesnt replace the old one
      let newNote = req.body;
      notes.push(newNote);
      updateDb();
      return console.log("Added new note: " + newNote.title);
    });

//GET by id
    app.get("api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });

//DELETEs the note by id 
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log("Deleted note with id " + req.params.id);
    });

//sends the data to display it on the app

//display the notes 
    app.get('/notes', function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

//displayes the index of notes
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

  //updates the database when a note is updated or deleted
    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};
