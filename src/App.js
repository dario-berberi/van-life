import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import Error from './components/Error';
import Home from './pages/Home';
import Dashboard, {loader as dashboardLoader} from './pages/Host/Dashboard';
import Income from './pages/Host/Income';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans';
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import HostVanPricing from './pages/Host/HostVanPricing';
import Reviews from './pages/Host/Reviews';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/Vans/Vans';
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail';
import Login, { action as loginAction } from './pages/Login';
import NotFound from './pages/NotFound';
import AuthRequired from './components/AuthRequired';

import './server';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route element={<AuthRequired />}>
        <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} loader={dashboardLoader} errorElement={<Error />} />
          <Route path="income" element={<Income />} />
          <Route path="vans" element={<HostVans />} loader={hostVansLoader} errorElement={<Error />} />

          <Route path="vans/:id" element={<HostVanDetail />} loader={hostVanDetailLoader} errorElement={<Error />}>
            <Route index element={<HostVanInfo />} />
            <Route path="pricing" element={<HostVanPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>

          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>

      <Route path="about" element={<About />} />
      <Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      {/**every element after : will be treted as a param
       * the param object properties will be named the same as what comes after : (our case {id: id-of-van})
       */}
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
