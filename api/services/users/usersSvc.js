/*
 *This file contains users creation, login, updation main logic
*/
'use strict';

//External Modules 
const   bcrypt      = require('bcryptjs');
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
            logger.info(loggerName+ "User Created Successfully @@@")
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
            logger.info(loggerName+ "User " +user.name+ " login Successfully @@@")
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

exports.logoutCS = function(data) {

    return new Promise(async (resolve, reject) => {

        try {
            data.user.tokens = data.user.tokens.filter((token) => {
                return token.token !== data.token
            })
            await data.user.save()
            logger.info(loggerName+ "User " +user.name+ " LogOut Current Session Succesfully @@@")
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

exports.logoutAS = function(data) {

    return new Promise(async (resolve, reject) => {

        try {
            data.user.tokens = []
            await data.user.save()
            logger.info(loggerName+ "User " +user.name+ " LogOut All Sessions Succesfully @@@")
            resolve("LogOut All Sessions Succesfully")

        } catch (err) {
            logger.error(loggerName+err);
            reject("Something failed, Please retry");
        }
    });

}

/**
 * Update user's profile
 *
 * @returns {Promise}
 */

exports.updateUser = function(data) {

    return new Promise(async (resolve, reject) => {

        const updates = Object.keys(data.body)
        const allowedUpdates = ["name", "email", "age"]
        const isvalidOperation = updates.every((updates) =>  allowedUpdates.includes(updates))

        if (!isvalidOperation){
            reject("Invalid updates!!!")
        }

        try {
            updates.forEach((update) => data.user[update] = data.body[update])
            await data.user.save()
            logger.info(loggerName+ "User " +data.user.name+ " User Succesfully Updated @@@")
            resolve("User Succesfully Updated")

        } catch (err) {
            logger.error(loggerName+err);
            reject("Something failed, Please retry");
        }
    });

}


/**
 * Update user's profile
 * @param {String} oldPassword
 * @param {String} newPassword
 *
 * @returns {Promise}
 */

exports.updatePassword = function(data) {

    return new Promise(async (resolve, reject) => {

        try {

            const isvalidOperation = bcrypt.compareSync(data.body.oldPassword, data.user.password)
            if (!isvalidOperation){
                logger.info(loggerName+ "User " +user.name+ " Incorrect Old password !!!")
                reject("Incorrect Old password!!!")
            }
            
            data.user.password = data.body.newPassword
            await data.user.save()
            logger.info(loggerName+ "User " +user.name+ " Password Succesfully Updated @@@")
            resolve("Password Succesfully Updated")

        } catch (err) {
            logger.error(loggerName+err);
            reject(err.message);
        }
    });

}