import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

async function getAccessToken() {
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({ grant_type: "client_credentials" }),
    };

    try {
        const authResponse = await axios.post(authOptions.url, authOptions.data, {
            headers: authOptions.headers,
        });
        return authResponse.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response ? error.response.data : error.message);
        return null;
    }
}

export async function searchTrack(query) {
    const token = await getAccessToken();
    if (!token) return null;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: query, type: "track", limit: 5 },
        });

        return response.data.tracks.items;
    } catch (error) {
        console.error("Error searching for tracks:", error.response ? error.response.data : error.message);
        return [];
    }
}

export async function getTrackInfo(trackId) {
    const token = await getAccessToken();
    if (!token) return null;

    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching track info:", error.response ? error.response.data : error.message);
        return null;
    }
}