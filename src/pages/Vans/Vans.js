import React from 'react';
import { Link, useSearchParams, useLoaderData, defer, Await } from 'react-router-dom';
import { getVans } from '../../api';
//import { getAllVans } from '../../api/firebase';
import { Suspense } from 'react';

export function loader() {
  //return defer({ vans: getAllVans() });
  return defer({ vans: getVans() });
}

function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();

  const vansPromise = useLoaderData();

  const typeFilter = searchParams.get('type');

  //use a function to make sure that when we go back and fourth from vans to vans details no other filters get changed
  //the only ones that will apply are the filters we choose from the filter nav bar in vans

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function renderVans(vans) {
    //check if we have any filters before filtering the display array of vans and if not diplay all of it
    const displayedVans = typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;

    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className="van-tile">
        <Link
          to={van.id}
          /**state propery is a browser history state and we need to use it to save the search querry filters 
              useful for us when going from a list of filtered vans to a secefic van and back without loosing the filter 
              go to VanDetails.js to see how we "catch" the state we are sendin*/
          state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
        >
          <img src={van.imageUrl} alt="van display" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));
    return (
      <>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handleFilterChange('type', 'simple')}
            className={`van-type simple 
                          ${typeFilter === 'simple' ? 'selected' : ''}`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange('type', 'luxury')}
            className={`van-type luxury 
                          ${typeFilter === 'luxury' ? 'selected' : ''}`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange('type', 'rugged')}
            className={`van-type rugged 
                          ${typeFilter === 'rugged' ? 'selected' : ''}`}
          >
            Rugged
          </button>

          {typeFilter ? (
            <button onClick={() => handleFilterChange('type', null)} className="van-type clear-filters">
              Clear filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </>
    );
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h1>Loading vans...</h1>}>
        <Await resolve={vansPromise.vans}>{renderVans}</Await>
      </Suspense>
    </div>
  );
}

export default Vans;
