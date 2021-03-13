import React, { useState, useEffect } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/actions/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'


function Login() {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

     /*
     useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []); */

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/dashboard" } };
            dispatch(userActions.login(email, password, from));
        }
        else {
            console.log({email, password});
        }
    }

    return (
        <section style={{marginTop: '80px'}}>
            <div className="column is-three-fifths is-offset-one-fifth">
                    <h1 className="title">Login to SimplyBoards</h1>
            </div>

            <div className="column is-three-fifths is-offset-one-fifth">
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input name="email" className="input" type="email" placeholder="Email" onChange={handleChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange}/>
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                    </p>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={handleSubmit}>LogIn</button>
                    </div>
                </div>

                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                
            </div>
        </section>
    );
}

export default withRouter(Login);