const fs = require('fs');
const path = require('path');
//export the app
module.exports = app => {

    // notes var setup
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);
    
        // api GET notes route
        app.get("/api/notes", function(req, res) {
            // Read the db.json file and return all saved notes as JSON.
            //takes the db.json file and returns all saved notes as JSON
            res.json(notes);
        });

        // api POST notes routes
        app.post("/api/notes", function(req, res) {
            // takes the new note, adds it to the db, and returns it without replacing the old note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // GET single note by id route
        app.get("/api/notes/:id", function(req,res) {
            //finds and displayes the json for the notes array by its id
            res.json(notes[req.params.id]);
        });

        // DELETE note route by id
        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });
//here is where i will make the note routes visible in the front end

        // displayes the notes.html when its called upon
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // displayes index.html when anything else is accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

       //function that either updates or deletes the json
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}