/**use error object because react will gove warning if you dont because it expects an object
 * new Error accepts a message as string and can objects array(optional) 
 * !!! but in order to pass the options array must have a cause propery;  
 * thats why we give the cause property ve value of the response or we can destructure it to get the response properties we need
 */
export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Failed to fetch vans", { cause: res})
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
   const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error("Failed to fetch vans", { cause: res})
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message, {cause: res}) 
    }

    return data
}