import React from 'react';
import { Link } from 'react-router-dom';

function NavBarUnAuth() {

    const [isActive, setisActive] = React.useState(false);

    console.log('RENDERING UN AUTH HEAEDER: ' + isActive);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">

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

            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <Link to="/login">
                            <button className="button is-ghost">Log In</button>
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/register">
                            <button className="button is-primary is-rounded">Sign Up</button>    
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBarUnAuth;