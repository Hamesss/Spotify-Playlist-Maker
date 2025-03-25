import { useState, useEffect } from "react";

import api from "../api";
import Note from "../components/Note.jsx";
import Header from "../components/Header.jsx";
import "../styles/Home.css";
import SongSearcher from "../components/SongSearcher.jsx";
import ErrorBoundary from "../components/ErrorBoundary";

function Home() {
    const [notes, setNotes] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => setNotes(data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Song deleted!");
                else alert("Failed to delete song");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    // ✅ Pass createNote function to SongSearcher
    const createNote = () => {
        if (!selectedSong) {
            alert("Please select a song first!");
            return;
        }

        api.post("/api/notes/", selectedSong)
            .then((res) => {
                if (res.status === 201) alert("Song added");
                else alert("Failed to add song");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Header />
            <ErrorBoundary>
                <SongSearcher onSongSelect={setSelectedSong} onSubmit={createNote} />
            </ErrorBoundary>

            <div>
                <h2>Songs</h2>
                {notes.length === 0 ? (
                    <p>No songs yet. Add one above!</p>
                ) : (
                    notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                )}
            </div>

            
            
        </div>
    );
}

export default Home;