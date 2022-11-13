import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RoutesApp from './routesApp'
import { Navbar } from './components/navbar'



export default function () {



  return (
    <div className='container-fluid'>

      <ToastContainer />

      <Navbar />

      <div className="container" style={{ marginTop: 200 }}>

        <RoutesApp />

      </div>
    </div>
  )
}
