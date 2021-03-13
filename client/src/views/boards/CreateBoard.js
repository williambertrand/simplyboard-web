import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { authHeader } from '../../helpers/AuthHeader';


const COLORS = ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF', '#bbb', '#eee', '#fff', '#000000']

const STEPS = [
    'start',
    'config',
    'confirm',
    'COMPLETED'
];

const handleChange = (t, y) => {
    //Do nothing
}

const configItemFactory = (item) => {
    let component;

    if(item.type === 'color') {
        component = (
            <div style={{padding: 5}}>
                <TwitterPicker triangle="hide" colors={COLORS} color={item.color} onChangeComplete={item.onChange} onChange={handleChange} />
            </div>
        );
    } else if (item.type === 'number') {
        component = (
            <div style={{padding: 5}}>
                <input className={`input ${item.isError(item.val) && 'is-danger'}`} type="number" placeholder={item.default} default={item.default} name={item.field} onChange={item.onChange}/>
            </div>
        );
    }

    return (
        <div className="block step-wrapper" key={`${item.field}_id`}>
            {item.i && (
                    <span className="step-i-bg">{item.i}</span>
                )}
            <h3 className="is-size-4 step-wrapper" style={{marginLeft: '28px'}}>
                {item.title}</h3>
            <p>{item.desc}</p>
            {component}
        </div>
    )

}

function CreateBoardView() {

    const [inputs, setInputs] = useState({
        gameName: '',
        gameDesc: '',
        backgroundColor: {hex: '#fff'},
        textColor: {hex: '#101010'},
        displayCount: 10,
    });
    
    const [step, setStep] = useState({
        index: 0,
        label: STEPS[0]
    });
    const [disableNext, setDisableNext] = useState(true);
    const { gameName, gameDesc, backgroundColor, textColor, displayCount } = inputs;

    const [game, setGame] = useState({})
    const [userKey, setUserKey] = useState('11234442345');
    const [err, setErr] = useState('');


    useEffect(() => {
        //Game has been set, show succssScreen
        if (!game.game_id) {
            return;
        }
        setStep({
            index: -1,
            label: 'success'
        });
    }, [game]);

    function handleChange(e) {
        const { name, value } = e.target;
        if(name === 'gameName') {
            setDisableNext(!value);
        }
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const goNext = () => {  
        const i = step.index;
        setStep({index: i + 1,  label: STEPS[i + 1]});
    }

    const submit = () => {
        const createBoardUrl = '/api/games';
        console.log("submitting with desc: " + gameDesc);
        const body = {
            name: gameName,
            desc: gameDesc,
            config: {
                backgroundColor: backgroundColor.hex,
                textColor: textColor.hex,
                displayCount,
            }
        }

        axios.post(createBoardUrl, body, {headers: authHeader()})
            .then( (response) => {
                const game = response.data;
                setGame(game);
            })
            .catch((err) => {
                setErr(err)
                setStep('err');
            })
    }

    /*  
        Config options:
        - Background Color
        - Text Color
        - Diisplay counts
    */
    const renderConfig = ()  => {
        const config_items = [
            {
                field: 'backgroundColor',
                title: 'Background Color',
                desc: 'This color will show as the background of your in-game leaderboard',
                type: 'color',
                i: 1,
                color: backgroundColor.hex,
                onChange: (v) => setInputs(inputs => ({ ...inputs, 'backgroundColor': v }))
            },
            {
                field: 'textColor',
                title: 'Text Color',
                desc: 'The color of your text on the leaderboard',
                type: 'color',
                i: 2,
                color: textColor.hex,
                onChange: (v) => setInputs(inputs => ({ ...inputs, 'textColor': v }))
            },
            {
                field: 'displayCount',
                title: 'Display Count',
                desc: 'The number of scores to display on the first page of your leaderboard. Must be beetween 5 and 50.',
                type: 'number',
                default: 10,
                i: 3,
                val: displayCount,
                isError: (v) => v < 5 || v > 50,
                onChange: handleChange
            },
        ]

        
        return (
            <div>
            <div className="columns">
                <div className="column is-half" style={{borderRight: 'solid 1px #eee'}}>
                    <h3 className="is-size-3 has-text-weight-bold">{gameName} Leaderboard</h3>
                    <p className="mb-4">Customize your leaderboard by selecting the options below.</p>
                    {config_items.map(i => configItemFactory(i))}
                </div>
                <div className="column is-half">
                    <section className="is-large">
                    <h3 className="is-size-4">Preview</h3>
                    <div style={{width: '200px', height: '300px', backgroundColor: backgroundColor.hex}}>
                        <table className="table" style={{width: '200px', height: '300px', backgroundColor: backgroundColor.hex, color: textColor.hex}}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th style={{color: textColor.hex}}>Name</th>
                                    <th style={{color: textColor.hex}}>Score</th>
                                    <th style={{color: textColor.hex}}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td> <td>Dan</td> <td>20,029</td><td>1/20/2021</td></tr>
                                <tr><td>2</td> <td>Jan</td> <td>18,286</td><td>1/23/2021</td></tr>
                                <tr><td>3</td> <td>Tim</td> <td>17,200</td><td>1/14/2021</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <hr/>
                    <div className="content">
                        <p className="is-size-4">Your current selected configuration is:</p>
                        <ul>
                            <li>Background: {backgroundColor.hex}</li>
                            <li>Text Color: {textColor.hex}</li>
                            <li>Display Count: {displayCount}</li>
                        </ul>
                    </div>

                    </section>
                </div>
            </div>
                <hr/>
                <div className="has-text-centered">
                    <p>Almost done, click Next to continue to the final step!</p>
                    <button className="button is-success is-large is-rounded" onClick={goNext}>Next</button>
                </div>
            </div>
        )
    }


    const colorItem = (color) => {
        return (
            <div 
                className="is-vcentered" 
                style={
                    {
                        width: '40px', height:'40px',
                        backgroundColor: color, 
                        borderRadius:4, 
                        boxShadow: '0 2px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',
                    }
                }>
            </div>
        )
    }

    const renderConfirm = () => {
        return (
            <div className="container is-max-desktop">
                <h3 className="title is-size-4">Create {gameName} Leaderboard</h3>
                <div>
                        <p className="is-size-5 mb-3">Your current selected configuration is:</p>

                        <table className="table is-striped is-hoverable" style={{marginLeft: '24px'}}>
                            <thead>
                                <th></th>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="is-vcentered">Game Name:</td>
                                    <td className="is-vcentered">{gameName}</td>
                                </tr>
                                <tr>
                                    <td className="is-vcentered">Description:</td>
                                    <td className="is-vcentered">{gameDesc}</td>
                                </tr>
                                <tr>
                                    <td className="is-vcentered">Background:</td>
                                    <td>
                                        {colorItem(backgroundColor.hex)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="is-vcentered">Text Color:</td>
                                    <td>
                                        {colorItem(textColor.hex)}
                                    </td>
                                </tr>
                                <tr style={{borderBottom: '2px solid #ddd'}}>
                                    <td className="is-vcentered">Display Count:</td>
                                    <td>
                                        {displayCount}
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                <div className="buttons  mt-4">
                    <button className="button is-success is-rounded" onClick={submit}>Create this Leaderboard</button>
                    <button className="button is-ghost">Cancel</button>
                </div>
            </div>
        );
    }

    const renderSuccess = () => {
        return (
            <div className="container is-max-desktop has-text-centered">
                <FontAwesomeIcon icon={faCheckCircle} color="#36B37E" size="4x"></FontAwesomeIcon>
                <h3 className="title c">Your leaderboard for {game.name} is ready!</h3>
                <hr/>
                
                <div className="content has-text-left">
                    <h3 className="is-size-4">
                        Adding to Unity
                    </h3>

                    <ol>
                        <li>Get the SimplyLeaderboard package from the Asset Store</li>
                        <li>Import to your project</li>
                        <li>Attach the "LeaderBoard" script to an object in your scene.</li>
                        <li>Update the <strong>GameId</strong> and <strong>AccessKeyId</strong> variables for your game</li>
                    </ol>

                    <div>
                        <h4 className="is-size-5">Game ID: {game.game_id}</h4>
                        <h4 className="is-size-5">Your profile Access Key ID: {userKey}</h4>
                    </div>

                </div>
                <div className="buttons">
                    <button class="button is-link is-rounded">View package in Unity Asset Store</button>
                </div>
                
            </div>
        );
    }

    const renderErr = () => {
        return (
            <div className="container is-max-desktop">
                Sorry, something has gone wrong.
                {err}
            </div>
        )
    }


    function renderStart() {
        return (
            <div className="container is-max-desktop">
                <h3 className="title is-size-4">Create a new Leaderboard</h3>
                <div className="field">
                    <label className="label">Game Name</label>
                    <div className="control">
                        <input 
                            onChange={handleChange}
                            className="input" 
                            type="text" 
                            placeholder="Enter the game name this Leaderboard will be for"
                            name="gameName"
                        />
                    </div>
                    <p className="help">You can always change this later on if needed</p>
                </div>
                <div className="field">
                    <label className="label">Game Description (optional)</label>
                    <div className="control">
                        <input 
                            onChange={handleChange}
                            className="input" 
                            type="text" 
                            placeholder=""
                            name="gameDesc"
                        />
                    </div>
                    <p className="help">What is your game about?</p>
                </div>

                <button className="button" disabled={disableNext} onClick={goNext}>Next</button>
            </div>
        )
    }

    const stepVal = step.label;
    let renderStep;
    switch(stepVal) {
        case 'start':
            renderStep = renderStart();
            break;
        case 'config':
            renderStep = renderConfig();
            break;
        case 'confirm':
            renderStep = renderConfirm();
            break;
        case 'success':
            renderStep = renderSuccess();
            break;
        default:
            renderStep = renderErr();
    }
    return (
        <div className="page">
            {renderStep}
        </div>
    )

}

export default CreateBoardView;