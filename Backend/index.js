const express = require("express");
const cors = require("cors"); // Allows frontend (different origin) to call APIs
const bodyParser = require("body-parser"); // Parses JSON request bodies
const db = require("./db"); // Import MySQL connection

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(bodyParser.json()); // Parse incoming JSON data

// Route: GET /notes - Fetch all notes from the database
app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Error fetching notes:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send notes as JSON
  });
});

// Route: POST /notes - Create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body; // Extract title and content from request
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) {
        console.error("Error creating note:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ id: result.insertId, message: "Note created" }); // Return new note ID
    },
  );
});

// Route: PUT /notes/:id - Update an existing note
app.put("/notes/:id", (req, res) => {
  const { id } = req.params; // Get note ID from URL
  const { title, content } = req.body; // Get updated data
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  db.query(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        console.error("Error updating note:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note updated" });
    },
  );
});

// Route: DELETE /notes/:id - Delete a note
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params; // Get note ID from URL
  db.query("DELETE FROM notes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting note:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note deleted" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
