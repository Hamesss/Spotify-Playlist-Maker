import React from "react"
import "../styles/Note.css"

function Note({ note, onDelete }) {
    return (
        <div className="note-container">
            {note.album_image && (
                <img src={note.album_image} alt={note.album} className="album-cover" />
            )}
            <div className="note-content">
                <p className="note-field"><strong>Song:</strong> {note.song_name}</p>
                <p className="note-field"><strong>Artist:</strong> {note.artist}</p>
                <p className="note-field"><strong>Album:</strong> {note.album}</p>
                <p className="note-field"><strong>Length:</strong> {note.length}</p>
            </div>
            <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
}

export default Note;