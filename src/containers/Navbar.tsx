import React from 'react';
import { Link } from 'react-router-dom';


function Navbar(props:any) {
    return (
        <div className='navbar'>
            <h1>Jenico</h1>
            <Link to="/" className='navLink'>
                <button>Home</button>
            </Link>
            <Link to="/music" className='navLink'>
                <button>Music</button>
            </Link>
            <Link to="/contact" className='navLink'>
                <button>Contact</button>
            </Link>
        </div>
    );
}

export default Navbar;