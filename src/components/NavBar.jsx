import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/react_Movie_Website">🎬 Movie App</Link>
            </div>
            <div className="navbar-links">
                {/* Navigation links for Home and Favorites pages */}
                <Link to="/react_Movie_Website" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;
