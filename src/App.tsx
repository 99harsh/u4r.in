import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import './App.scss';

import Backdrop from './assets/images/backdrop.svg';
import Cubes from './assets/images/cubes.svg';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './Routes/PrivateRoutes'
import AuthContextProvider from './context/Auth-Context';
import AuthRoute from './Routes/AuthRoutes';
import Details from './components/Details/Details';



function App() {
  return (
    <div className="main-container">
      <div>
        <img src={Backdrop} className='main-backdrop-img' alt='backdrop-img' />
        <img src={Cubes} className='main-backdrop-img' alt='cubes' />
      </div>
      <div>
        <AuthContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/url-details"
                element={
                  <ProtectedRoute>
                    <Details />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Home />
                  </AuthRoute>
                }
              />
              <Route
                path='/auth'
                element={
                  <AuthRoute>
                    <Auth />
                  </AuthRoute>
                }
              />

            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
