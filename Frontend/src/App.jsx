import { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard.jsx";

const API_URL = "http://localhost:3000/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const loadNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
      alert("Error loading notes. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (!response.ok) throw new Error("Failed to create note");
      setTitle("");
      setContent("");
      loadNotes();
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Error creating note.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id, newTitle, newContent) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          content: newContent.trim(),
        }),
      });
      if (!response.ok) throw new Error("Failed to update note");
      loadNotes();
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Error updating note.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete note");
      loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} transition-colors duration-500`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Notes</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-lg transition-colors duration-200`}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className={`w-full p-3 border ${isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 placeholder:text-gray-200" : "border-gray-300 bg-gray-300 text-gray-700 placeholder:text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note Content"
            rows="4"
            className={`w-full p-3 border   ${isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 placeholder:text-gray-200" : "border-gray-300 bg-gray-300 text-gray-700 placeholder:text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical `}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 ${isDarkMode ? "bg-green-600 hover:bg-green-700 disabled:bg-gray-500" : "bg-green-500 hover:bg-green-600 disabled:bg-gray-400"} text-white rounded-lg transition-colors duration-200`}
          >
            {loading ? "Adding..." : "Add Note"}
          </button>
        </form>
        {loading && <p className="text-center">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
