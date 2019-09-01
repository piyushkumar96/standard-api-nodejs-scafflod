/*
 *This file contains users creation, login, updation main logic
*/
'use strict';

// Internal Modules
const   userSchema = require('../../models/users/usersModel'),
        logger = require('../../../logger');

const   loggerName    = "[usersSvc ]: ";

/**
 * Create User
 * @param {String} name
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */

exports.createUser = function(data) {
    const user = new userSchema(data)

    return new Promise(async (resolve, reject) => {

        try {
            await user.save()
            const token = await user.generateAuthToken()
            resolve({"user": user,"token":token})

        } catch (err) {
            logger.error(loggerName+err);
            if (err.name === 'MongoError' && err.code === 11000) {
                reject("User with email address exists");
            }
            reject(err.message);
        }
    });

}


/**
 * Login User
 * @param {String} email
 * @param {String} password
 *
 * @returns {Promise}
 */

exports.loginUser = function(loginData) {

    return new Promise(async (resolve, reject) => {

        try {
            const user = await userSchema.findByCrendentials(loginData.email, loginData.password)
            const token = await user.generateAuthToken()
            resolve({"user": user,"token":token})

        } catch (err) {
            logger.error(loggerName+err);
            reject("Authentication failed");
        }
    });

}


/**
 * Get User
 *
 * @returns {Promise}
 

exports.getUser = function() {

    return new Promise(async (resolve, reject) => {

        try {
            const user = await userSchema.findByCrendentials(loginData.email, loginData.password)
            const token = await user.generateAuthToken()
            resolve({"user": user,"token":token})

        } catch (err) {
            logger.error(loggerName+err);
            reject("Authentication failed");
        }
    });

}
*/


/**
 * Logout User's Current Session
 *
 * @returns {Promise}
 */

exports.logoutCS = function(loginData) {

    return new Promise(async (resolve, reject) => {

        try {
            loginData.user.tokens = loginData.user.tokens.filter((token) => {
                return token.token !== loginData.token
            })
            await loginData.user.save()
            resolve("LogOut Current Session Succesfully")

        } catch (err) {
            logger.error(loggerName+err);
            reject("Something failed, Please retry");
        }
    });

}

/**
 * Logout User's All Sessions
 *
 * @returns {Promise}
 */

exports.logoutAS = function(loginData) {

    return new Promise(async (resolve, reject) => {

        try {
            loginData.user.tokens = []
            await loginData.user.save()
            resolve("LogOut All Sessions Succesfully")

        } catch (err) {
            logger.error(loggerName+err);
            reject("Something failed, Please retry");
        }
    });

}
