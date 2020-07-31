import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import Signup from './components/Signup';
import { Tabs, Tab } from 'react-bootstrap';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
function App() {
   const [key, setKey] = useState("home");
  return (
      <Router>
          <div className="main">
              <div className="links">
                  <Link className="p-5" to="/login">
                      Login
                  </Link>
                  <Link className="p-5" to="/signup">
                      Signup
                  </Link>
              </div>
              <div className="App">
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
              </div>
          </div>
      </Router>
  );
}

export default App;
