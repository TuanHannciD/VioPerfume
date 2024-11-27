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
import { Link } from 'react-router-dom';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Xử lý logic đăng ký tại đây
    console.log('Full Name:', fullName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Address:', address);
  };

  return (
    <MDBContainer fluid className="my-4" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MDBCard className="shadow-lg w-100" style={{ maxWidth: '1080px', minHeight: '80vh' }}>
        <MDBRow className="g-0">

          <MDBCol md="6" className="d-none d-md-flex justify-content-center align-items-center">
            <MDBCardImage
              src="https://studiochupanhdep.com/Upload/Images/Album/anh-chup-ban-lam-viec-98.jpg"
              alt="sign up form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6" className="d-flex justify-content-center align-items-center">
            <MDBCardBody className="d-flex flex-column w-100 p-4">

              <div className="d-flex flex-row mb-4 justify-content-center">
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">VioPerfume</span>
              </div>

              <h5 className="fw-normal my-4 text-center" style={{ letterSpacing: '1px' }}>Create your account</h5>

              <MDBInput
                wrapperClass="mb-4"
                label="Full Name"
                id="fullnameControlLg"
                type="text"
                size="lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="usernameControlLg"
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
                label="Phone number"
                id="phonenumberControlLg"
                type="text"
                size="lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Address"
                id="adressControlLg"
                type="text"
                size="lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <MDBBtn className="mb-4 px-5" color="dark" size="lg" onClick={handleSignUp}>
                Sign Up
              </MDBBtn>

              <p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>
                Already have an account? <Link to={"/login"} style={{ color: '#393f81' }}>Login here </Link>
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

export default SignUp;
