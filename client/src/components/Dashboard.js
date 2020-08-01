import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";

export default function Dashboard({username, type}) {
    const [User, setUser] = useState({});
    useEffect(() => {
        axios
            .get("/api/profile", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then(user => {
                console.log("user", user);
                setUser(user.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    switch (User.type) {
        case "A":
            return (
                <div className="cont">
                    <h1>Type {User.type}</h1>
                    <img className="image1" src={User.images[0].data} alt="" />
                </div>
            );
        case "B":
            return (
                <Fragment>
                    <h5>Type {User.type}</h5>
                    <div className="cont-b">
                        <img
                            className="image1"
                            src={User.images[0].data}
                            alt=""
                        />
                        <img
                            className="image1"
                            src={User.images[1].data}
                            alt=""
                        />
                    </div>
                </Fragment>
            );
        case "C":
            return (
                <Fragment>
                    <h5>Type {User.type}</h5>
                    <div className="cont-c">
                        <img
                            className="image1"
                            src={User.images[0].data}
                            alt=""
                        />
                        <img
                            className="image1"
                            src={User.images[1].data}
                            alt=""
                        />
                    </div>
                </Fragment>
            );
        default:
            return null;
    }
}
