import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';  // Import CSS của MDB UI Kit

import Home from './pages/Home'; // Trang Home
import SignUp from './pages/Signup';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Đặt Home làm trang chủ */}
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
