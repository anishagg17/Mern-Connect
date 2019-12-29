import axios from 'axios';
import { setAlert } from './alert';
import { setAuthToken } from '../utils/setAuthToken';

export const registerUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
  } catch (error) {
    setAlert('REGISTER_FAIL', 'danger');
    dispatch({
      type: 'REGISTER_FAIL'
    });
  }
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    setAlert('LOGIN_FAIL', 'danger');
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

//Log out

export const logout = () => dispatch => {
  dispatch({ type: 'CLEAR_PROFILE' });
  dispatch({ type: 'LOGOUT' });
};
