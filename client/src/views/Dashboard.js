import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { authHeader } from '../helpers/AuthHeader';

function Dashboard() {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showItem, setShowItem] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('slb-user')));

    const getGames = () => {
        setLoading(true);
        axios.get(`/api/v1/games`, {headers: authHeader()})
            .then(response => {
                setGames(response.data.items);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }
    
    useEffect(() => {
        // code to run on component mount
        getGames()
    }, []);


    const renderItemDetails = (item) => {
        return (
            <div className="block content" style={{padding: 10}}>
                <p className="is-size-5 m-0">Game Id: <strong>{item.game_id}</strong></p> 
                <p className="is-size-5 mt-0 mb-3">Access Key Id: <strong>{user.accessKey}</strong></p>
                <p className="is-hint">Use these values to configure your game object in Unity.</p>
            </div>
        )
    }


    const renderGameItem = (item) => {
        return (
            <div key={item.id} className="card  game-list-item" style={{border: `2px solid ${item.config.backgroundColor}`}}>
                <h3 className="card-header-title is-size-4">
                    {item.name}
                </h3>
                <p className="is-size-5">
                    {item.description}
                </p>
                <div className="card-content">
                    <p>
                        <strong>Scores: </strong>{item.scores || 0}  
                    </p>
                    <p>
                        <strong>Most Recent Score: </strong>{moment(item.lastScoreAt).format('MMMM Do YYYY')}
                    </p>
                    <p>
                        <strong>Created: </strong>{moment(item.createdAt).format('MMMM Do YYYY')}
                    </p>
                </div>
                <footer className="card-footer">
                    {
                        showItem === item.id 
                        ? renderItemDetails(item) 
                        : <a className="card-footer-item" onClick={() => setShowItem(item.id)}>Show Config Details</a>
                    }
                </footer>
            </div>
        )
    }


    const renderAddBoard = () => {
        if(user && user.type === 'premium' || user.type === 'trial') {
            return (
                <div className="mt-5">
                    <Link to="/boards/create">
                        <button className="button is-success is-rounded">New LeaderBoard</button>
                    </Link>
                    {user.type === 'trial' && (
                        <p className="is-hint mt-3">Your free trial includes unlimited game leaderboards. If you downgrade to a Free Account at the end of your trial you will need to delete any extra leaderboards above the free tier limit of <strong>1</strong>.</p>
                    )}
                </div>
            );
        } else if (user && user.type === 'basic') {
            return (
                <div className="mt-5">
                    <p className="ml-3">You've reached your limit for LeaderBoards on your free plan</p>
                    <Link to="/boards/create">
                        <button className="button is-ghost">Upgrade to Premium</button>
                    </Link>
                </div>
            )
        }
    }

    const renderBoards = () => {
        if (games && games.length > 0) {
            return (
                <div>
                    {games.map(i => renderGameItem(i))}
                    {renderAddBoard()}
                </div>
            )
        } else if (!loading) {
            return (
                <div>
                    <Link to="/boards/create">
                        <button className="button is-success is-rounded">Create your first LeaderBoard</button>
                    </Link>
                </div>
            )
        }
        else {
            return (<div></div>);
        }
    }

    return (
        <div className="page">
            <h1 className="title">Your LeaderBoards</h1>
            <div style={{padding: '10px', marginTop: '5px'}}>
                {renderBoards()}
            </div>
        </div>
    )
}

export default Dashboard;