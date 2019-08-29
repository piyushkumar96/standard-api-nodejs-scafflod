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
