import axios from 'axios';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    // console.log(res);
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err }
    });
  }
};

export const getProfiles = () => async dispatch => {
  // dispatch({ type: 'CLEAR_PROFILE' });

  try {
    const res = await axios.get('/api/profile');
    // console.log(res);
    dispatch({
      type: 'GET_PROFILES',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { err }
    });
  }
};

// Get profile by ID
export const getProfileById = userId => async dispatch => {
  // console.log(userId);
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { err }
    });
  }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: 'GET_REPOS',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { err }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: 'GET_PROFILE',
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err }
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err }
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err }
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: 'PROFILE_ERROR',
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: 'CLEAR_PROFILE' });
      dispatch({ type: 'ACCOUNT_DELETED' });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
