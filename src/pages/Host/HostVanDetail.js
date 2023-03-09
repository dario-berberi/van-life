import React, { Suspense } from 'react';
import { Link, NavLink, Outlet, useLoaderData, Await, defer } from 'react-router-dom';
import { getHostVans } from '../../api';
//import { getVan } from '../../api/firebase';

export function loader({ params }) {
  return defer({ hostVanDetail: getHostVans(params.id) });
}

function HostVanDetail() {
  const hostVanDetailPromise = useLoaderData();

  function renderHostVanDetail(currentVan) {
    const activeStyles = {
      fontWeight: 'bold',
      textDecoration: 'underline',
      color: '#161616',
    };
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt="van display" />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink to="." style={({ isActive }) => (isActive ? activeStyles : null)} end>
            Details
          </NavLink>
          <NavLink to="pricing" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Pricing
          </NavLink>
          <NavLink to="photos" style={({ isActive }) => (isActive ? activeStyles : null)}>
            Photos
          </NavLink>
        </nav>
        {/**destructure the object that is state as a best practice */}
        <Outlet context={{ currentVan }} />
      </div>
    );
  }

  return (
    <section>
      {/**relative = "path" makes is to when we use .. to go back it wont be relative to the route but the url path */}
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h3>Loading details...</h3>}>
        <Await resolve={hostVanDetailPromise.hostVanDetail}>{renderHostVanDetail}</Await>
      </Suspense>
    </section>
  );
}

export default HostVanDetail;
