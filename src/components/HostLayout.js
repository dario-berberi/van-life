//use style for NavLink
import { Outlet, NavLink } from 'react-router-dom';

function HostLayout() {
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };
  return (
    <>
      <nav className="host-nav">
        {/** set the relative link to "." because its the index route as the parent
         * use ---end--- because dashboard is the index route of /host and will be always active 
         * since all the other components are nested in /host it needs a way to "stop" */}
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="." end>
          Dashboard
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="income">
          Income
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="vans">
          Vans
        </NavLink>
        <NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to="reviews">
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;
