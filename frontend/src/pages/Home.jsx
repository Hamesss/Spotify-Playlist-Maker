import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note.jsx";
import Header from "../components/Header.jsx";
import "../styles/Home.css";
import Song from "../components/Song.jsx";
import SongSearcher from "../components/SongSearcher.jsx";
import ErrorBoundary from "../components/ErrorBoundary";

function Home() {
    const [notes, setNotes] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);  // ✅ Added state for selected song

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log("Notes:", data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        if (!selectedSong) {
            alert("Please select a song first!");
            return;
        }

        api.post("/api/notes/", selectedSong)
            .then((res) => {
                if (res.status === 201) alert("Note created");
                else alert("Failed to make note");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <Header />

            <ErrorBoundary>
                <SongSearcher onSongSelect={setSelectedSong}/>
            </ErrorBoundary>

            <h2>Add a song</h2>
            <form onSubmit={createNote}>
                <p><strong>Selected Song:</strong> {selectedSong ? selectedSong.song_name : "None"}</p>
                <button type="submit">Submit</button>
            </form>

            <div>
                <h2>My Songs</h2>
                {notes.length === 0 ? (
                    <p>No songs yet. Choose one above!</p>
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