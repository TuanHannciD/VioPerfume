import React from 'react';
import { useNavigate } from 'react-router-dom';

function CallToAction() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <section className="cta">
      <h2>Ready to get started?</h2>
      <button onClick={handleSignUp}>Sign Up Now</button>
      <h2>You have account ?</h2>
      <button onClick={handleLogin}>Login Now</button>
    </section>
  );
}

export default CallToAction;
