//useRouteError is a hook that lets us display the details of the error
import { useRouteError } from 'react-router-dom'

function Error(){
    const error = useRouteError();
    console.log(error)
    
    return(
        <>
            <h1>Error: {error.message}</h1>
            <pre >{error.cause.status} - {error.cause.statusText}</pre>
        </>
    )
}

export default Error;