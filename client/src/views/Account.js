import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import moment from 'moment';

import { userActions } from '../redux/actions/user';
import { authHeader } from '../helpers/AuthHeader';

function AccountPage() {

    const dispatch = useDispatch();
    const [account, setAccount] = useState(
        JSON.parse(localStorage.getItem('slb-user'))
    );
    const [loading, setLoading] = useState(true);
    const [coppied, setCoppied] = useState(false);

    const getAccountInfo = () => {
        axios.get(`/api/users/info`, {headers: authHeader()})
            .then(response => {
                setAccount(response.data);
            })
            .catch(err => console.error(err));
    }
    
    useEffect(() => {
        // code to run on component mount
        // getAccountInfo()
    }, []);


    const copyToClipboard = (text) => {
        const ta = document.createElement("textarea");
        ta.innerText = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        setCoppied(true);
        setTimeout(function(){ setCoppied(false) }, 1500);
    };
    


    const renderTypeInfo = (type) => {
        const today = moment();
        const endDate  = moment(account.trialEndDate);
        const trialRemaining = endDate.diff(today, 'days')
        if (type === 'premium' || type === 'trial') {
            return (
                <div>
                    <span className="tag is-success is-light is-large" style={{margin: 10}}>
                        Premium Account {type === 'trial' && ( <strong style={{marginLeft: 8}}>{' '} (Trial)</strong>)}
                    </span>

                    <div className="box" style={{maxWidth: 450}}>
                        <div className="content">
                            <h5> Premium Account Benefits</h5>
                            <ul style={{listStyle: 'none'}}>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Unlimited online leaderboards
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Unlimited saves  per leaderboard
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Full leaderboard customization options
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Premium Support
                                </li>
                            </ul>
                        </div>
                    </div>

                    {type === 'trial' && (
                        <p className='ml-3'>You have {trialRemaining} days left in your premium trial.</p>
                    )}

                    <Link to="/account/manage"><button className="button is-ghost">Manage Account Subscription</button></Link>
                </div>
            )
        } else if (type === 'basic') {
            return (
                <div>
                    <span className="tag is-success is-light is-large">Basic Account</span>

                    <div className="box">
                            <div className="content">
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> One online leaderboard
                                        <p>Upgrade to premium for unlimited leaderboards</p>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Up to 50 saved scores
                                        <p>Upgrade to premium for unlimited saved scores</p>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} color="#36B37E"></FontAwesomeIcon> Limited leaderboard customization options
                                        <p>Upgrade to premium for full leaderboard customization options</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    <Link to="/account/upgrade"><button className="button is-succeess">Upgrade to Premium</button></Link>
                </div>
            );
        }
    }


    const renderAccountInfo = () => {
        return (
            <div className="content">
                <h4>Email</h4>
                <p>{account.email}</p>

                <h4>AccessKey Id</h4>
                <div className="control has-icons-right" style={{width: 200, marginBottom: '2rem', cursor: 'pointer'}} onClick={() => copyToClipboard(account.accessKey)}>
                    <input className="input" type="text" readOnly value={account.accessKey}/>
                    <span className="icon is-small is-right" style={{marginRight: 4}}>
                        <p>Copy</p>
                    </span>
                    {coppied && (<p className="help is-success">Coppied to ClipBoard</p>)}
                </div>

                <h4>Account Type</h4>
                {renderTypeInfo(account.type)}

                <h4 className="mt-5">Account Created</h4>
                <p>{moment(account.createdAt).format('MMMM Do YYYY')}</p>
            </div>
        )
    }

    return (
        <div className="page">
            <h1 className="title">Your Account</h1>
            <div style={{padding: '10px', marginTop: '5px'}}>
                {renderAccountInfo()}
                <div>
                    <button className="button is-ghost" onClick={() => dispatch(userActions.logout())}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;