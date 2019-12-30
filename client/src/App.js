import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './Store';
import Alert from './layout.js/Alert';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import CreateProfile from './components/dashboard/CreateProfile';
import EditProfile from './components/dashboard/EditProfile';
import AddExperience from './components/dashboard/addExperience';
import AddEducation from './components/dashboard/addEducation';
import Profiles from './components/profile/profiles';
import Profile from './components/profile/profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
    // console.log(store.getState());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <Route exact path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
