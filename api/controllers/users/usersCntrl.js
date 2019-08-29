/*
 *This file contains users creation, login, updation control flow
*/
'use strict';

// Internal Modules
const   usersSvc = require('../../services/users/usersSvc');

const   loggerName = "[UsersController]: ";

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
        let result = await usersSvc.createUser(name, email, password);
        res.status(202).json({
            success: true,
            message: result
        });
    } catch(err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
}