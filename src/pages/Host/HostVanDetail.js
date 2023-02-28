import React from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"

function HostVanDetail(){
    const { id } = useParams();
    const [currentVan, setCurrentVan] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/host/vans/${id}`).then(res => res.json()).then(data => setCurrentVan(data.vans))
    }, [id])

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return(
        currentVan ? (
            <section>
            {/**relative = "path" makes is to when we use .. to go back i wont be relative to the route but the url path */}
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt="van display" />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>

                <nav className="host-van-detail-nav">
                    <NavLink to="."  style={({isActive}) => isActive ? activeStyles : null} end >Details</NavLink>
                    <NavLink to="pricing"  style={({isActive}) => isActive ? activeStyles : null} >Pricing</NavLink>
                    <NavLink to="photos"  style={({isActive}) => isActive ? activeStyles : null} >Photos</NavLink>
                </nav>
                {/**destructure the object that is state as a best practice */}
                <Outlet context={{currentVan}}/>
            </div>
        </section>
        ) : <h2>Loading...</h2>
    )
}

export default HostVanDetail