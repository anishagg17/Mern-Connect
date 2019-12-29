import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ isAuthenticated, loginUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { password, email } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    // console.log(auth);
    loginUser(email, password);
  };
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <>
      <h1 className="large text-primary">Log In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign In to Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button onClick={onSubmit} className="btn btn-primary">
          Log In
        </button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loginUser })(Login);
