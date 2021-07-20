import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import BasketForm from './BasketForm';


const CreateBasket = (props) => {
    //create state for the new basket object
    const [ errors, setErrors ] = useState({});
    const [ basket, setBasket ] = useState({
        gift: false,
        type: "",
        numberItems: "",
        message: "",
        items: "",
    });

    // handle the forms ubmit to create the documents through the API
    const handleSubmit = (e) => {
        e.preventDefault();

        // axios to post the obejct to our API
        axios.post("http://localhost:8000/api/baskets", basket, {
            withCredentials: true
        })
            .then((res) => {
                // on success, redirect (navigate) to the movie list
                console.log(res.data);
                // if we have validation errors
                if(res.data.errors) {
                    setErrors(res.data.errors);
                }
                else {
                    navigate("/baskets");
                }
            })
            .catch((err) => {
                // on failure, save the errors in state so user can corret the bad input
                console.log(err.response.status);
                if(err.response.status === 401) {
                    navigate("/loginRegister");
                }
            })
    }

    return (
        <div>
            <h3>Create a Customized Basket</h3>
            <BasketForm
                basket={ basket }
                setBasket= { setBasket }
                errors= { errors }
                handleSubmit={ handleSubmit }
                submitButtonLabel={ "Create Basket" }
            />
        </div>
    )
}

export default CreateBasket;