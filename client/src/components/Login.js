import React, {Component} from "react";
import {Form, Button, Modal} from "react-bootstrap";
import axios from "axios";
import Dashboard from "./Dashboard";
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            data: {},
            showModal: false,
            modalBody: "",
        };
    }

    handleUsernameChange = event => {
        console.log(event.target.value);
        this.setState({
            username: event.target.value,
        });
    };
    handlePasswordChange = event => {
        console.log(event.target.value);

        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = event => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
        };
        axios
            .post("/api/login", data)
            .then(res => {
                console.log("res", res);
                this.setState({
                    data: res.data,
                });
                localStorage.setItem("token",res.data.token)
            })
            .catch(err => {
                console.log("err", err);
                if (err) {
                    this.setState({
                        showModal: true,
                        modalBody: "Invalid Credentials",
                    });
                }
            });
    };
    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };
    render() {
        if (this.state.data.username) {
            return (
                <Dashboard
                    username={this.state.data.username}
                    type={this.state.data.type}
                />
            );
        }
        return (
            <div className="cont">
                <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            placeholder="Enter username"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            placeholder="Enter Password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <Modal
                    show={this.state.showModal}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modalBody}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Login;
