
import Backdrop from './assets/images/backdrop.svg';
import Cubes from './assets/images/cubes.svg';

import './App.scss';
import Header from './constants/Header/Header';

function App() {
  return (
    <div className="main-container">
      <div>
        <img src={Backdrop} className='main-backdrop-img' />
        <img src={Cubes} className='main-backdrop-img' />
      </div>
      <div>
        <Header />
      </div>
    </div>
  );
}

export default App;
