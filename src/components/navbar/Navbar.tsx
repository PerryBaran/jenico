import { Link } from "react-router-dom";
import style from "./navbar.module.css";

function Navbar() {
  return (
    <nav className={style.container}>
      <Link to="/" className={style.link}>
        Jenico
      </Link>
      <div />
      <Link to="/" className={style.link}>
        Home
      </Link>
      <div />
      <Link to="/music" className={style.link}>
        Music
      </Link>
      <div />
      <Link to="/contact" className={style.link}>
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;
