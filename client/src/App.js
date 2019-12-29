import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './Store';
import Alert from './layout.js/Alert';

function App() {
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
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
