//NavLink allows you to use classname and style not only as strings but also as fucnctions
//in this example we use classname
import { Link, NavLink } from 'react-router-dom';
import loginLogo from '../assets/images/avatar-icon.png'

function Header() {
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin")
}

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="host">
          Host
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="about">
          About
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="vans">
          Vans
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="login">
          <img src={loginLogo} className="login-icon" alt="login logo" />
        </NavLink>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}

export default Header;
