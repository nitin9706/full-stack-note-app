import { useState } from "react";

function NoteCard({ note, onEdit, onDelete, loading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    if (!editTitle.trim() || !editContent.trim()) return;
    onEdit(note.id, editTitle, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="3"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2 text-gray-200">
            {note.title}
          </h3>
          <p className="text-gray-300 mb-4 whitespace-pre-wrap">
            {note.content}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-black rounded transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              disabled={loading}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteCard;
