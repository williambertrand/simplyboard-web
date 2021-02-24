import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'

import { userActions } from '../redux/actions/user';



function Signup(){

    const [isEmailValid, setEmailValid] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    // const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.name && user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div>
            <section>

                <div className="column is-three-fifths is-offset-one-fifth">
                    <h1 className="title">Register to start using SimplyBoards</h1>
                </div>

                <div className="column is-three-fifths is-offset-one-fifth">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className="input" 
                                name="name"
                                type="text" 
                                value={user.name} onChange={handleChange}
                                placeholder="What should we call you?" 
                            />
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className="input" 
                                name="email"
                                value={user.emaiil} onChange={handleChange}
                                type="email" 
                                placeholder="Email input"/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                        {/* <p className="help is-danger">This email is invalid</p> */}
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input 
                                className="input" 
                                name="password"
                                value={user.password} onChange={handleChange}
                                type="password" 
                                placeholder="Please input a password"/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle"></i>
                            </span>
                        </div>
                        {/* <p className="help is-danger">This email is invalid</p> */}
                    </div>

                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" /> I agree to the <a href="#">terms and conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link" onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="control">
                            <button className="button is-ghost is-light">Cancel</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="column is-three-fifths is-offset-one-fifth">
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </div>
    )
}


export default Signup;