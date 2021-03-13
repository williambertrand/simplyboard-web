import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    const [isActive, setisActive] = React.useState(false);

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation" style={{borderBottom: "1px solid #eee"}}>

            <div className="navbar-brand">
                <a className="navbar-item" href="/dashboard">
                    <p className="has-text-weight-semibold is-size-5">SimplyLeaderBoards</p>
                </a>
                <a 
            onClick={() => {
                setisActive(!isActive)
              }}
            role="button" 
            className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            </div>

            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <div className="navbar-item">
                        <Link to="/dashboard">
                            <button className="button is-ghost">Dashboard</button>
                        </Link>
                        <Link to="/account">
                            <button className="button is-ghost">Account</button>
                        </Link>
                    </div>
                </div>

                <div className="navbar-end">
                </div>
            </div>
        </nav>
    );
}

export default NavBar;