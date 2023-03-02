import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../api';
function Vans() {
  const [searchParams, setSearchparams] = useSearchParams();

  const [vans, setVans] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const typeFilter = searchParams.get('type');

  //useEffect with dependency array empty so it runs fetch only on page load
  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans();
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => setSearchparams({ type: 'simple' })}
          className={`van-type simple ${typeFilter === 'simple' && 'selected'}`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchparams({ type: 'luxury' })}
          className={`van-type luxury ${typeFilter === 'luxury' && 'selected'}`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchparams({ type: 'rugged' })}
          className={`van-type rugged ${typeFilter === 'rugged' && 'selected'}`}
        >
          Rugged
        </button>
        {/**conditionally render the clear filters only when a filter is selected */}
        {typeFilter && (
          <button onClick={() => setSearchparams({})} className="van-type clear-filters">
            Clear filters
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

export default Vans;
