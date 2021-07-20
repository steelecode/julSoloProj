import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import DeleteBasket from './DeleteBasket';


const AllBaskets = (props) => {
    // create some state to hold an array of baskets
    const [ baskets, setBaskets ] = useState([]);

    //use effect to get the data as soon as the component is rendered
    useEffect(() => {
        // use axios to get all baskets from the basckend server / api
        axios.get("http://localhost:8000/api/baskets")
            .then((res) => {
                console.log(res.data);
                //set the new data in our state form the API - set State
                setBaskets(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const afterDeleteHandler = () => {
        navigate("/baskets");
    }

    return (
        <div>
            <h3>Your Saved Baskets</h3>
            <Link to={"/baskets/new"}>
                <button>Create Basket</button>
            </Link>
            {
                baskets.map((basket, index) => (
                    <div key={index}>
                        <Link to={ "/baskets/" + basket._id }>
                        {basket.type}
                        </Link>
                        <DeleteBasket 
                            id={ basket._id }
                            afterDeleteHandler={ afterDeleteHandler }
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default AllBaskets;