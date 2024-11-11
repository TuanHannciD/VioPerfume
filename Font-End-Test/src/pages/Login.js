import React, { useState } from 'react';
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


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Thêm logic đăng nhập của bạn ở đây
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

              <form onSubmit={handleLogin}> {/* Form wrapper for better semantic structure */}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="emailControlLg"
                  type="email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

                <MDBBtn className="mb-4 px-5" color="dark" size="lg" type="submit">
                  Login
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
}

export default Login;
