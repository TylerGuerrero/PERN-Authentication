import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';

// Components
import DashBoard from './components/DashBoard'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const setAuth = (state) => {
    setIsAuthenticated(state)
  }

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={(props) => !isAuthenticated ? <Login { ...props } setAuth={setAuth} /> : <Redirect to="/dashboard" /> } />
            <Route exact path="/register" render={(props) => !isAuthenticated ? <Register { ...props } setAuth={setAuth} /> : <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" render={(props) => isAuthenticated ? <DashBoard {...props } setAuth={setAuth} /> : <Redirect to="/login" /> } />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
