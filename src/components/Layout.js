/**Layout will serve as a mini app component for the netsed routs wicth will define the strucutre of the page 
 * in this case header will be on top of all the child components inside of layout route 
 * outlet lets you create a way for the child components which url matches to render after the parent 
*/
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout(){
    return(
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;