import React, {useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { login } from '../api/auth';
import { setToken } from '../utils/storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Quản lý thông báo lỗi
  const [isLoading, setIsLoading] = useState(false); // Quản lý trạng thái loading

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn form reload khi submit

    setIsLoading(true); // Bắt đầu loading
    setErrorMessage(null); // Xóa lỗi trước đó (nếu có)

    try {
      const data = await login({ username, password }); // Gọi API login
      setToken(data.token); // Lưu token vào storage
      alert('Login successful!');
      window.location.href = 'http://localhost:3001/admin/';
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid credentials.'); // Cập nhật lỗi
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <MDBContainer fluid className="my-4" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MDBCard className="shadow-lg w-100" style={{ maxWidth: '1080px', minHeight: '80vh' }}>
        <MDBRow className="g-0">
          <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6" className="d-flex justify-content-center align-items-center">
            <MDBCardBody className="d-flex flex-column w-100 p-4">
              <div className="d-flex flex-row mb-4 justify-content-center">
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">VioPerfume</span>
              </div>

              <h5 className="fw-normal my-4 text-center" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

              <form onSubmit={(e) => handleLogin(e)}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="emailControlLg"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="passwordControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {errorMessage && (
                  <p className="text-danger text-center">{errorMessage}</p>  // Hiển thị lỗi nếu có
                )}

                <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Login'}
                </MDBBtn>
              </form>

              <a className="small text-muted" href="#!">Forgot password?</a>

              <p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>
                Don't have an account? <a href='/signup' style={{ color: '#393f81' }}>Register here</a>
              </p>

              <div className="d-flex flex-row justify-content-center">
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
