import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </>
    </Router>
  );
}

export default App;
