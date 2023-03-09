/**react hook to get parameters from the url
 * in our case we get the id of the vans in order to display the detailed info about that van 
*/
import { useLocation, useLoaderData, Link, Await, defer } from "react-router-dom"
import React, {Suspense} from "react";
import { getVans } from "../../api";
//import { getVan } from "../../api/firebase";

export function loader({params}){
    //return defer({vanDetail: getVan(params.id)})
    return defer({vanDetail: getVans(params.id)})
}

function VanDetail(){
    //catch the state from the link we used to navigate in van details with the hook useLocation()
    const location = useLocation();
    //console.log(location); to clear confusions with location.search and location.state.search
    
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

    const vanDetailPromise = useLoaderData()

    return(
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            {/**use conditional rendering because the state is initialized as null so it would break before the fetch req is completed */}
            <Suspense fallback={<h3>Loading details...</h3>}>
                <Await resolve={vanDetailPromise.vanDetail}>
                    {(van)=>(
                        <div className="van-detail">
                                <img src={van.imageUrl} alt="dsiplay van"/>
                            <div>
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price"><span>${van.price}</span>/day</p>
                                <p>{van.description}</p>
                                <button className="link-button">Rent this van</button>
                            </div>
                    </div>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}

export default VanDetail