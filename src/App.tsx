import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react'; 
import { AuthContext } from './context/Auth-Context';
import './App.scss';


import Backdrop from './assets/images/backdrop.svg';
import Cubes from './assets/images/cubes.svg';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './Routes/PrivateRoutes'
import AuthContextProvider from './context/Auth-Context';
import AuthRoute from './Routes/AuthRoutes';


function App() {

  return (
    <div className="main-container">
      <div>
        <img src={Backdrop} className='main-backdrop-img' />
        <img src={Cubes} className='main-backdrop-img' />
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
              {/* <Route path='/' element={<Home />} /> */}
              {/* <Route path='/auth' element={<Auth />} /> */}

            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
