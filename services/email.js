// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')


function sendMail(to, subject, message) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to,
        from: 'william.bertrand94@gmail.com',
        subject,
        html: message,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })  
}


exports.newWaitlistSignupEmail = () => {
    const dateTime = new Date();
    sendMail('w.bertrand@hey.com', 'New SimplyBoards waitlist signup!', `<h3>New Signup!</h3><p>There was a new waitlist sign up at: ${dateTime} </p>`)
}