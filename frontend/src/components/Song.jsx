import { useState } from "react";
import { searchTrack, getTrackInfo } from "../spotifyAuth.js";
import "../styles/Song.css";

export default function Song() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [song, setSong] = useState(null);

    async function handleSearch() {
        if (!query.trim()) return;
        const results = await searchTrack(query);
        setSearchResults(results);
    }

    async function selectSong(trackId) {
        const songData = await getTrackInfo(trackId);
        if (songData) setSong(songData);
    }

    return (
        <div className="song-container">
            <input
                type="text"
                placeholder="Search for a song..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((track) => (
                        <li key={track.id} onClick={() => selectSong(track.id)}>
                            {track.name} - {track.artists.map(a => a.name).join(", ")}
                        </li>
                    ))}
                </ul>
            )}

            {song && (
                <div className="song-info">
                    <img 
                    src={song.album?.images?.[0]?.url || "https://placehold.co/150"} 
                    alt={song.album?.name || "Unknown Album"} 
                    className="album-cover" 
                    />
                    <h2 className="song-name">{song.name}</h2>
                    <p><strong>Artist:</strong> {song.artists.map(artist => artist.name).join(", ")}</p>
                    <p><strong>Album:</strong> {song.album.name}</p>
                    <p><strong>Duration:</strong> {Math.floor(song.duration_ms / 60000)}:
                        {((song.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                    </p>
                </div>
            )}
        </div>
    );
}