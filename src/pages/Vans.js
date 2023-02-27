import React from 'react';

function Vans() {
  const [vans, setVans] = React.useState([]);
//useEffect with dependency array empty so it runs fetch only on page load
  React.useEffect(() => {
    fetch('/api/vans')
      .then((res) => res.json())
      .then((data) => setVans(data.vans));
  }, []);

  const vansDis = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <img src={van.imageUrl} alt="van display" width={200} />
      <div className="van-info">
        <h3>{van.name}</h3>
        <p>
          ${van.price}
          <span>/day</span>
        </p>
      </div>
      <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </div>
  ));
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      {vansDis}
    </div>
  );
}

export default Vans;
