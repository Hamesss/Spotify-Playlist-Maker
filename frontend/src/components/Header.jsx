import "../styles/Header.css";
import logo from "../assets/Spotify-logo.svg";
function Header() {
    return (
        <header className="header">
            <div className = "logo-and-name">
                <img src={logo} alt="Company Logo" className="logo" />
                <h1 className="website-name">Spotify Playlist Maker</h1>
                <h5>(*Unofficial)</h5>
            </div>
            <nav>
                <div className="links">
                    <a className="link" href="../">Home</a>
                    <a className="link" href="/login">Login</a>
                    <a className="link" href="/register">Register</a>
                </div>
                
            </nav>
        </header>
    );
}

export default Header;