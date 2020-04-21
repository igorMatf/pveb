import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import axios from "axios";
import AppContext from './contexts/AppContext';
import Home from './pages/home/Home';
import './components/page/Page.css';
import './components/form/Form.css';

import Navbar from './components/navbar/Navbar';
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile';

function App() {
  

  useEffect(() => {
    init();
  }, []);

  const [isInitiated, setIsInitiated] = useState(false);
  const [user, setUser] = useState(null);
  
  const logout = () => {
    setUser(null);
    localStorage.setItem('token', null);
  };

  const init = async () => {
    const token = localStorage.getItem("token");
    const {data} = await axios.get('/api/user/init?token='+token);
    setUser(data.user);
    setIsInitiated(true);
  };

  
  return (
    <div>
       {true && ( 
        <AppContext.Provider value={{user, setUser, logout}}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              
              <Route path="/profile">
              {user ? <Profile /> : <Redirect to="/" />} 
              </Route>

              <Route path="/auth/register">
                {!user ? <Register/> : <Redirect to="/"/>}
              </Route>
              
              <Route path="/auth/login">
                {!user ? <Login/> : <Redirect to="/"/>}
              </Route>
            </Switch>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
