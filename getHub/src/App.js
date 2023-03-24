import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path='/'></Route>
        <Route element={<User />} path='/users/:id'></Route>
      </Routes>
    </div >



  );
}

export default App;
