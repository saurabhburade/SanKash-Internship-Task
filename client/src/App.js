import React, {useState, Fragment} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {isAuth} from "./config/auth";
import {Button} from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import AllImages from "./components/AllImages";

// import Dashboard from './components/Dashboard';
function App() {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    return (
        <Router>
            <div className="main">
                <div className="links">
                    {isAuth() ? (
                        <Fragment>
                            <Button onClick={handleLogout}>Logout</Button>
                            <Link className="p-5" to="/images">
                                All images
                            </Link>
                            <Link className="p-5" to="/dashboard">
                                Dashboard
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link className="p-5" to="/login">
                                Login
                            </Link>
                            <Link className="p-5" to="/signup">
                                Signup
                            </Link>
                            <Link className="p-5" to="/images">
                                All images
                            </Link>
                        </Fragment>
                    )}
                </div>
                <div className="App">
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/images" exact component={AllImages} />
                </div>
            </div>
        </Router>
    );
}

export default App;
