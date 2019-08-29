/*
 *This file contains users creation, login, updation main logic
*/
'use strict';

// Internal Modules
const   userSchema = require('../../models/users/usersModel'),
        logger = require('../../../logger');

const   loggerName    = "[users Service]: ";

/**
 * Generate cryptos on the basis of user parameters
 * @param {String} name
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */

exports.createUser = function(name, email, password) {
    
    const user = new userSchema({
        "name":name,
        "email":email,
        "password":password
    })

    return new Promise(async (resolve, reject) => {

        try {
            await user.save()
            const token = await user.generateAuthToken()
            resolve({"user": user,"token":token})

        } catch (err) {
            logger.error(loggerName, err);
            reject(err.message);
        }
    });

}




