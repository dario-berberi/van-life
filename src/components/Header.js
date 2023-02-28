//NavLink allows you to use classname and style not only as strings but also as fucnctions
//in this example we use classname
import { Link, NavLink } from 'react-router-dom';

function Header() {

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink  style={({isActive}) => isActive ? activeStyles : null} to="host">
          Host
        </NavLink>
        <NavLink  style={({isActive}) => isActive ? activeStyles : null} to="about">
          About
        </NavLink>
        <NavLink  style={({isActive}) => isActive ? activeStyles : null} to="vans">
          Vans
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
