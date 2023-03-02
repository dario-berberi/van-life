/**react hook to get parameters from the url
 * in our case we get the id of the vans in order to display the detailed info about that van 
*/
import { useLocation, useParams, Link } from "react-router-dom"
import React from "react";

function VanDetail(){
    //save the parameters in a variable
    const params = useParams();
    //catch the state from the link we used to navigate in van details with the hook useLocation()
    const location = useLocation();
    //console.log(location); to clear confusions with location.search and location.state.search
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans))
    }, [params.id])
    /*
    !!! note useLocation() send an object that has a search property as well 
    in this case the search property that we use is the one we named the object back in Vans.js
    we are interested in the state property
    so dont confuse location.search with location.state.search

    ---optional chaining---
    syntax that determines if the location.state is true then execute whats after ? 
        otherwise execute whats after ||
    */
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return(
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            {/**use conditional rendering because the state is initialized as null so it would break before the fetch req is completed */}
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt="dsiplay van"/>
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}

export default VanDetail