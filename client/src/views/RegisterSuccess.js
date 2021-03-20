import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faCheckCircle } from '@fortawesome/free-solid-svg-icons'



function RegisterSuccess() {

    return (
        <div>
            <section style={{marginTop: 80}}>
                <div className="has-text-centered">
                    <FontAwesomeIcon className={"fas fa-2x"} icon={faCheckCircle} color={"#36B37E"} size={"lg"}/>
                </div>
                <div className="column is-three-fifths is-offset-one-fifth">
                    <h1 className="title">Thank you for joining the waitlist</h1>
                    <p>We'll send you an email as soon as your account is ready!</p>


                    <p style={{marginTop:'60px'}}>SimplyBoards 2021</p>

                </div>
            </section>
        </div>
    )
}


export default RegisterSuccess;