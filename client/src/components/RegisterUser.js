import React, { useState } from "react";
import axios from "axios";

const Register = props => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    // Using a single state object to hold all data
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        password: "",
        confirmPassword: "",
    })

    // using a single function to update the state object
    //    we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
            user,             // the user state is already an object with the correct keys and values!
            {
                // this will force the sending of the credentials / cookies so they can be updated
                //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
                //    unless withCredentials is set to true before making the request
                withCredentials: true,
            })
            .then(res => {
                console.log(res.data);

                // when we successfully created the account, reset state for registration form
                //    We do this if we are NOT navigating automatically away from the page
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    password: "",
                    confirmPassword: "",
                })

                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrs({});  // remember to reset errors state if it was successful
            })
            .catch((err) => {
                console.log(err);
                setErrs(err.response.data.errors);
            });
    };

    return (
        <div>
            <h3>Create Account</h3>
            <p>Create an account for exclusive access to our entire line of products and services!</p>
            {
                confirmReg ?
                    <h4 style={{ color: "green" }}>{confirmReg}</h4>
                    : null
            }
            <form onSubmit={register}>
                <div>
                    <label>First Name</label>
                    {
                        errs.firstName ?
                            <span className="error-text">{errs.firstName.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    {
                        errs.lastName ?
                            <span className="error-text">{errs.lastName.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Address</label>
                    {
                        errs.address ?
                            <span className="error-text">{errs.address.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="address"
                        value={user.address}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>City</label>
                    {
                        errs.city ?
                            <span className="error-text">{errs.city.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="city"
                        value={user.city}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>State</label>
                    {
                        errs.state ?
                            <span className="error-text">{errs.state.message}</span>
                            : null
                    }
                    <input
                        type="text"
                        name="state"
                        value={user.state}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    {
                        errs.email ?
                            <span className="error-text">{errs.email.message}</span>
                            : null
                    }
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    {
                        errs.password ?
                            <span className="error-text">{errs.password.message}</span>
                            : null
                    }
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    {
                        errs.confirmPassword ?
                            <span className="error-text">{errs.confirmPassword.message}</span>
                            : null
                    }
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="center">
                    <button
                        type="submit"
                    >Create Account</button>
                </div>
            </form>
        </div>
    );
};

export default Register;