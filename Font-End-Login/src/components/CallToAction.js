import React from 'react';
import { Link } from 'react-router-dom';  // Import Link từ react-router-dom

function CallToAction() {
  return (
    <section className="cta">
      <h2>Ready to get started?</h2>
      <Link to="/signup">
        <button>Sign Up Now</button>
      </Link>
      <h2>You have an account?</h2>
      <Link to="/login">
        <button>Login Now</button>
      </Link>
    </section>
  );
}

export default CallToAction;
