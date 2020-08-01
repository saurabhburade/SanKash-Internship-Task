import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";

export default function AllImages() {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios
            .get("/api/images/all")
            .then(data => {
                console.log("user", data);
                setImages(data.data);
                console.log("images", images);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className="images-container">
            {images.length ? (
               images.map((element,index)=>{
                   return (
                       <div className="image-cont" key={index}>
                           <label>{element.imageName}</label>
                           <img src={element.data} alt={element.imageName} />
                       </div>
                   );
               })
            ) : null}
        </div>
    );
}
