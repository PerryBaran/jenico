import { Link } from 'react-router-dom';
import style from './navbar.module.css';

function Navbar() {
    return (
        <div className={style.container}>
            <h1><Link to="/" className={style.link}>Jenico</Link></h1>
            <div className={style.gradientBorder}/>
            <Link to="/" className={style.link}>
                <button>Home</button>
            </Link>
            <div className={style.gradientBorder}/>
            <Link to="/music" className={style.link}>
                <button>Music</button>
            </Link>
            <div className={style.gradientBorder}/>
            <Link to="/contact" className={style.link}>
                <button>Contact</button>
            </Link>
        </div>
    );
};

export default Navbar;