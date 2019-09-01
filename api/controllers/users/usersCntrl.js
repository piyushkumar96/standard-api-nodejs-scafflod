/*
 *This file contains users creation, login, updation control flow
*/
'use strict';

// Internal Modules
const   usersSvc = require('../../services/users/usersSvc'),
        logger = require('../../../logger');

const   loggerName = "[usersCntrl]: ";

// function for creating a new user
exports.createUser = async function (req, res) {
    let  name = req.body.name,
         email = req.body.email,
         password = req.body.password;

    if (!name || !email || !password) {
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }

    try {
        let result = await usersSvc.createUser(req.body);
        res.status(202).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false, 
            message: err
        });
    }
}

// function for logging user
exports.loginUser = async function (req, res) {
    let  email = req.body.email,
         password = req.body.password;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Invalid parameters'
        });
    }

    try {
        let result = await usersSvc.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

// function for getting user
exports.getUser = async function (req, res) {

    try {
        let result = req.user;
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false,
            message: err
        });
    }
}


// function for logout user's current session
exports.logoutCS = async function (req, res) {
    try {
        let result = await usersSvc.logoutCS(req);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(500).json({
            success: false,
            message: err
        });
    }
}

// function for logout user's all session
exports.logoutAS = async function (req, res) {
    try {
        let result = await usersSvc.logoutAS(req);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(500).json({
            success: false,
            message: err
        });
    }
}

// function for update the user's profile
exports.updateUser = async function (req, res) {
    try {
        let result = await usersSvc.updateUser(req);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false,
            message: err
        });
    }
}

// function for update the user's password
exports.updatePassword = async function (req, res) {
    
    let  password = req.body.oldPassword,
         newPassword = req.body.newPassword,
         cfmPassword = req.body.cfmPassword;

    if (!password || !newPassword || !cfmPassword) {
        res.status(400).json({
            success: false,
            message: 'Missing parameters!!!'
        });
    }else if(newPassword !== cfmPassword){
        res.status(400).json({
            success: false,
            message: 'Password did not Match!!!'
        });
    }
    
    try {
        let result = await usersSvc.updatePassword(req);
        res.status(200).json({
            success: true,
            message: result
        });
    } catch(err) {
        logger.error(loggerName + err)
        res.status(400).json({
            success: false,
            message: err
        });
    }
}