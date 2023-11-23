import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="navContainer">
                <div className="navMenu">
                    <Link className="navLink" to="/boards">Boards</Link>
                    <Link className="navLink" to="/users">Users</Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;