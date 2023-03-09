import React, { Suspense } from 'react';
import { Link, defer, Await, useLoaderData } from 'react-router-dom';
import { getHostVans } from '../../api';
//import { getHostVans } from '../../api/firebase';

export function loader() {
  //return defer({ hostVans: getHostVans() });
  return defer({ hostVans: getHostVans() });
}

function HostVans() {
  const hostVansPromise = useLoaderData();

  function rederHostVans(vans) {
    const hostVansEls = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`display of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h1>Your vans are loading...</h1>}>
        <Await resolve={hostVansPromise.hostVans}>{rederHostVans}</Await>
      </Suspense>
    </section>
  );
}

export default HostVans;
