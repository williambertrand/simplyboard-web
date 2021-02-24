import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export default class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goDisabled: true
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({groupName: e.target.value, goDisabled: (e.target.value.length < 3)})
    }

    render() {
        const { goDisabled } = this.state;
        return (
            <div className="App has-text-centered" style={{marginTop: '80px'}}>
              <h1 className="title">SimplyLeaderBoards</h1>
              <p className="subtitle">
                Add a leaderboard to your game in minutes.
              </p>

              <div className="container is-max-desktop">
                <input 
                    className="input" 
                    style={{maxWidth: 650, margin:12, textAlign:'center'}} 
                    type="text" 
                    onChange={this.onInputChange}
                    placeholder="Entere the name of your game"/>
                <br/>
                <button className="button is-primary is-rounded" disabled={goDisabled}>Create Your Game's Leaderboard</button>
              </div>

              <div style={{marginTop: '40px'}}>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
              </div>
            </div>
        );
    }
}
