import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../PC/PC.scss";


  const PC = () => {
  const url = "http://localhost:8080/api/products";

  const [getProducts, setGetProducts] = useState([]);

  
  useEffect(() => {
  
    axios
    .get(url)
    .then((response) => {
        console.log(response.data);
        setGetProducts(response.data);
    })
   
},[])

    
return(    
        <div className="card-pc-container">
            {getProducts.map(product => {
                if (product.tipo === "PC"){
                    return(
                            <div key={product._id} >
                                <div className="card-pc">
                                    <p>{product.marca}</p>
                                    <Link to = {`/pc/${product._id}`}>
                                    <img className="pc-img" src={product.img} alt={product.tipo}/>
                                    <p>{product.precio}€</p>
                                    </Link>
                                </div>
                            </div>
                    )
                } 
                return null
            }
            )}
        </div>
)};

export default PC;