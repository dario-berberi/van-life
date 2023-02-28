/**react hook to get parameters from the url
 * in our case we get the id of the vans in order to display the detailed info about that van 
*/
import { useParams } from "react-router-dom"
import React from "react";

function VanDetail(){
    //save the parameters in a variable
    const params = useParams();
    const [van, setVan] = React.useState(null)

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans))
    }, [params.id])

    return(
        <div className="van-detail-container">
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