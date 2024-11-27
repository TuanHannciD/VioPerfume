import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Cập nhật Routes và Route
import 'mdb-react-ui-kit/dist/css/mdb.min.css';  // Import CSS của MDB UI Kit

import Home from './pages/Home'; // Trang Home
import SignUp from './pages/Signup'; // Trang Sign Up
import Login from './pages/Login';  // Trang Login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Đặt Home làm trang chủ */}
        <Route path="/signup" element={<SignUp />} />  {/* Trang đăng ký */}
        <Route path="/login" element={<Login />} />  {/* Trang đăng nhập */}
      </Routes>
    </Router>
  );
}

export default App;
