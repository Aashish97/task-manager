const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'itsmeasish98@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'itsmeasish98@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}