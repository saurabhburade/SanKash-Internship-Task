import React, {Component} from "react";
import {Form, Button, Modal, Col} from "react-bootstrap";
import Dashboard from "./Dashboard";
import axios from "axios";

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            type: "A",
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
    handleTypeChange = event => {
        console.log(event.target.value);

        this.setState({
            type: event.target.value,
        });
    };
    handleSignup = event => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password,
            type: this.state.type,
        };
        axios
            .post("http://localhost:8000/signup", data)
            .then(res => {
                console.log("res", res);
                this.setState({
                    data: res.data,
                });
                localStorage.setItem("token", res.data.token);
                
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
                <Form onSubmit={this.handleSignup}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            placeholder="Enter username"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            placeholder="Enter Password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            required
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Signup
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

export default Signup;
