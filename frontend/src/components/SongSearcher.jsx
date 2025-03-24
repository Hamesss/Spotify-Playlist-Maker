import { useState } from "react";
import { searchTrack, getTrackInfo } from "../spotifyAuth.js";
import "../styles/Song.css";

export default function SongSearcher({ onSongSelect, onSubmit }) {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [song, setSong] = useState(null);

    async function handleSearch() {
        if (!query.trim()) return;
        const results = await searchTrack(query);
        setSearchResults(results);
        console.log("Search Results:", results);
    }

    async function selectSong(trackId) {
        const songData = await getTrackInfo(trackId);
        if (songData) {
            setSong(songData);
            console.log("Selected Song:", songData);

            onSongSelect({
                song_name: songData.name,
                artist: songData.artists.map(artist => artist.name).join(", "),
                album: songData.album.name,
                length: `${Math.floor(songData.duration_ms / 60000)}:${
                    ((songData.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")
                }`,
                album_image: songData.album?.images?.[0]?.url || ""
            });
        }
    }

    return (
        <div className="song-container">
            <div className="input-and-list">
                <div className = "form-and-button">
                    <input
                        type="text"
                        placeholder="Search for a song..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
            {searchResults.length > 0 && (
            <ul className="search-results">
                {searchResults.map((track) => (
                    <li key={track.id} onClick={() => selectSong(track.id)}>
                        <img 
                            src={track.album?.images?.[0]?.url || "https://placehold.co/50"} 
                            alt={track.album?.name || "Unknown Album"} 
                            className="song-thumbnail" 
                        />
                        <div className="song-details">
                            <span className="song-title">{track.name}</span>
                            <span className="song-artist">{track.artists.map(a => a.name).join(", ")}</span>
                        </div>
                    </li>
                ))}
            </ul>
        )}
</div>


            {song && (
                <div className="song-info">
                    <div className="cover-and-name">
                        <img 
                            src={song.album?.images?.[0]?.url || "https://placehold.co/150"} 
                            alt={song.album?.name || "Unknown Album"} 
                            className="album-cover" 
                        />
                        <h2 className="song-name">{song.name}</h2>
                    </div>
                    <p><strong>Artist:</strong> {song.artists.map(artist => artist.name).join(", ")}</p>
                    <p><strong>Album:</strong> {song.album.name}</p>
                    <p><strong>Duration:</strong> {Math.floor(song.duration_ms / 60000)}:
                        {((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                    </p>
                    <button onClick={onSubmit} disabled={!song} className="submit-button">
                        Add
                    </button>
                </div>
            )}
        </div>
    );
}