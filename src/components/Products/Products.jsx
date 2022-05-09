import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProductContext } from "../../pages/ProductsPage/ProductsPage";
import { Link } from "react-router-dom";
import "../Products/Products.scss";

export const Products = () => {
  const url = "http://localhost:8080/api/products";

  const [getProducts, setGetProducts] = useState([]);

  var {producto} = useContext(ProductContext);
  
  useEffect(() => {
  
    axios
    .get(url)
    .then((response) => {
        console.log(response.data);
        setGetProducts(response.data);
    })
   
},[url])

    
return(    
        <div>
            {getProducts.map(product => {
                if (product.tipo === producto){
                    return(
                            <div key={product._id}>
                                <div className="card-products">
                                    <p>{product.tipo}</p>
                                    <Link to = {`/products/${product._id}`}>
                                    <img src={product.img} alt={product.tipo}/>
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

