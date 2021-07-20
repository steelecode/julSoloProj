import React from 'react';
import axios from 'axios';

const DeleteBasket = (props) => {
    const { id, afterDeleteHandler } = props;
    const deleteHandler = (e, id) => {
        e.preventDefault();

        axios.delete("http://localhost:8000/api/baskets/" + id)
            .then((res) => {
                console.log(res.data);
                afterDeleteHandler();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <button className="deleteBtn" onClick={ (e) => deleteHandler(e, id)}>Delete Basket</button>
    )
}

export default DeleteBasket;