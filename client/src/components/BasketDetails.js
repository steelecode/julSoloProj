import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import DeleteBasket from './DeleteBasket';

const BasketDetails = (props) => {
    // create state to hold the basket details
    const [ basket, setBasket ] = useState({});

    // useEffect to retrive data from the API
    useEffect(() => {
         // axios call to get the details
        axios.get("http://localhost:8000/api/baskets/" + props.id)
            .then((res) => {
                console.log(res.data);
                // set State with the details from the API
                setBasket(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [props.id]);

    const afterDeleteHandler = () => {
        navigate("/baskets");
    }

    return (
        <div>
            <h1>Basket Details</h1>
            <p>Gift: {basket.gift}</p>
            <p>Type: {basket.type}</p>
            <p>Number of Items: {basket.numberItems}</p>
            <p>Custom Message: {basket.message}</p>
            <p>Items: {basket.items}</p>
            <Link to={"/baskets"}>
                <button>Back to Saved Baskets</button>
            </Link>
            <Link to={"/baskets/" + props.id + "/edit"}>
                <button>Edit {basket.type}</button>
            </Link>
            <DeleteBasket 
                id={ props.id }
                afterDeleteHandler={ afterDeleteHandler }
            />
        </div>
    )
}

export default BasketDetails;