import React, { Fragment } from "react";

export default function Dashboard({username,type}) {
    switch (type) {
        case "A":
            return (
                <div className="cont">
                    <h1>Type {type}</h1>
                    <h1><strong>Image 1 here</strong></h1>
                </div>
            );
        case "B":
            return (
                <Fragment>
                    <h5>Type {type}</h5>
                    <div className="cont-b">
                        <h1>
                            <strong>Image 1 here</strong>
                        </h1>
                        <h1>
                            <strong>Image 2 here</strong>
                        </h1>
                    </div>
                </Fragment>
            );
        case "C":
            return (
                <Fragment>
                    <h5>Type {type}</h5>
                    <div className="cont-c">
                        <h1>
                            <strong>Image 2 here</strong>
                        </h1>
                        <h1>
                            <strong>Image 3 here</strong>
                        </h1>
                    </div>
                </Fragment>
            );
        default:
            return (
                <div className="cont">
                    <h1>Welcome {username}</h1>
                    <h1>Type {type}</h1>
                </div>
            );
    }
}
