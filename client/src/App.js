import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
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

  async function isAuth () {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/is-verify", { headers: { token: JSON.parse(localStorage.getItem("token"))}})
      data === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isAuth()
  }, [])

  toast.configure()

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
