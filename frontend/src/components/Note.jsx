import React from "react"
import "../styles/Note.css"



function Note({note, onDelete}){
    
    return <div className="note-container">
        {note.album_image && (
                <img src={note.album_image} alt={note.album} className="album-cover" />
            )}
        <p className="Song name">{note.song_name}</p>
        <p className="Artist">{note.artist}</p>
        <p className="Album">{note.album}</p>
        <p className="Length">{note.length}</p>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
            Delete
        </button>
    </div>

}

export default Note;