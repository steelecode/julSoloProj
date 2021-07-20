import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const BasketForm = (props) => {

    const { basket, setBasket, errors, handleSubmit, submitButtonLabel } = props;

    const types = [
        'Calming',
        'Energizing',
        'Manifesting',
        'Immunity Boosting',
        'Digestion Aid',
    ];

    const inputChange = (e) => {
        console.log("input name: " + e.target.name);
        console.log("input value: " + e.target.value);
        console.log("input checked: " + e.target.checked);

        let newBasketObject = { ...basket };
        if(e.target.name === "gift") {
            newBasketObject[e.target.name] = e.target.checked;
        }
        else {
            newBasketObject[e.target.name] = e.target.value;
        }
        setBasket(newBasketObject);
    }

    return (
        <div>
            <form onSubmit={ (e) => handleSubmit(e) }>
            <div>
                    <label>Type</label>
                    {
                        errors.type ?
                            <span className="error-text">{errors.type.message}</span>
                            : null
                    }
                    <select
                        name="type"
                        value={ basket.type }
                        onChange={ (e) => inputChange(e) }
                        >
                            <option value=""></option>
                            {
                                types.map((basketType) => (
                                    <option value={basketType} key={basketType}>{basketType}</option>
                                ))
                            }
                        </select>
                </div>
                <div>
                    <label>Number Items</label>
                    <input
                        type="number"
                        min="3"
                        name="numberItems"
                        value={ basket.numberItems }
                        onChange={ (e) => inputChange(e) }
                    />
                </div>
                <div className="checkboxDiv"> 
                    <input
                        type="checkbox"
                        name="gift"
                        checked={ basket.gift }
                        onChange={ (e) => inputChange(e) }
                    />
                    <label>Gift</label>
                </div>
                <div>
                    <label>Message</label>
                    <input
                        type="text"
                        name="message"
                        value={ basket.message }
                        onChange={ (e) => inputChange(e) }
                    />
                </div>
                <div>
                    <label>Items</label>
                    {
                        errors.items ?
                            <span className="error-text">{errors.items.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="items"
                        value={ basket.items }
                        onChange={ (e) => inputChange(e) }
                    />
                </div>
                <button type="submit">{ submitButtonLabel }</button>
                <Link to={"/baskets"}>
                <button>Cancel</button>
            </Link>                
                </form>
        </div>
    )
}

export default BasketForm;