/*
 *This file is used for sending the emails using the SendGrid.
*/
'use strict';

//External Modules 
const   sgMail = require('@sendgrid/mail');

//Internal Modules 
const   config = require('../../../config/config.json');

const   loggerName    = "[emailHelper ]: ";

// SendGrid API Key
const SG_API_KEY = process.env.SENDGRID_API_KEY || config.sendgrid_api_key

sgMail.setApiKey(SG_API_KEY)

// function to send Welcome Mail to New User
/**
 * Create User
 * @param {String} name
 * @param {String} usrEmailID
 *
 */

 module.exports.sendWelcomeMail = async (name, usrEmailID) => {
     sgMail.send({
         to: usrEmailID,
         from: process.env.SENDER_EMAILID || config.senderEmailID,
         subject: "Thanks for Joining us @@@@",
         text: `Welcome to the application, ${name}. Let me know, if you have any queries.`
     })
 }

 // function to send Goodbye mail
/**
 * Create User
 * @param {String} name
 * @param {String} usrEmailID
 *
 */

module.exports.sendGoodbyeMail = async (name, usrEmailID) => {
    sgMail.send({
        to: usrEmailID,
        from: process.env.SENDER_EMAILID || config.senderEmailID,
        subject: "Sorry to see you go !!!",
        text: `Goodbye, ${name}. I hope to see again sometime soon`
    })
}

