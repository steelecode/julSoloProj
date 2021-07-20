import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import BasketForm from './BasketForm';
import DeleteBasket from './DeleteBasket';

const EditBasket = (props) => {
    const { id } = props;
    const [ errors, setErrors ] = useState({});
    const [ basket, setBasket ] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/baskets/" + id)
            .then((res) => {
                console.log(res.data);
                setBasket(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // handle the forms ubmit to create the documents through the API
    const handleSubmit = (e) => {
        e.preventDefault();

        // axios to post the obejct to our API
        axios.put("http://localhost:8000/api/baskets/" + id, basket)
            .then((res) => {
                // on success, redirect (navigate) to the movie list
                console.log(res.data);
                // if we have validation errors
                if(res.data.errors) {
                    setErrors(res.data.errors);
                }
                else {
                    navigate("/baskets/" + id);
                }
            })
            .catch((err) => {
                // on failure, save the errors in state so user can corret the bad input
                console.log(err);
            })
    }

    const afterDeleteHandler = () => {
        navigate("/baskets");
    }
    
    return (
        <div>
            <h1>Edit Basket</h1>
            <BasketForm
                basket={ basket }
                setBasket= { setBasket }
                errors= { errors }
                handleSubmit={ handleSubmit }
                submitButtonLabel={ "Update Basket" }
            />
            <DeleteBasket 
                id={ props.id }
                afterDeleteHandler={ afterDeleteHandler }
            />
        </div>
    )
}

export default EditBasket;