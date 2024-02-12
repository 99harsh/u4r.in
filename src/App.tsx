import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';


import Backdrop from './assets/images/backdrop.svg';
import Cubes from './assets/images/cubes.svg';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  return (
    <div className="main-container">
      <div>
        <img src={Backdrop} className='main-backdrop-img' />
        <img src={Cubes} className='main-backdrop-img' />
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />


            <Route path='/dashboard' element={<Dashboard />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
