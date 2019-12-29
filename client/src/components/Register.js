import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alert';

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, password, confirmPassword, email } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("passwords don't match", 'danger');
      console.log('password', password);
    } else {
      console.log('formData', formData);
      const user = {
        name,
        email,
        password
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify(user);

        const res = await axios.post('/api/users', body, config);
        console.log('res', res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            required
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
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
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button onClick={onSubmit} className="btn btn-primary">
          Register
        </button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  );
};

export default connect(null, { setAlert })(Register);
