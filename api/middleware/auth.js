/*
 *This file is for authenticating user to hit APIs
*/

'use strict';

// External Modules
const   jwt = require('jsonwebtoken');

// Internal Modules
const   userSchema = require('../models/users/usersModel'),
        config = require('../../config/config.json'),
        logger = require('../../logger');

const   loggerName    = "[authMiddleware ]: ";

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.jwt_secret)
        const user  = await userSchema.findOne({ _id: decoded._id , 'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }catch(err){
        logger.error(loggerName + err)
        res.status(401).send({error : "Please Authenticate First"})
    }
}