/*
 * This file is used for setting up the environment variables for testing users routes
*/
'use strict';

//External Modules 
const   mongoose = require('mongoose'),
        jwt = require('jsonwebtoken');

// Internal Modules
const   user = require('../../../models/users/usersModel'),
        config = require('../../../../config/config.json');

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Aditi Yaduvanshi',
    email: 'aditi@gmail.com',
    password: 'Aditi@123',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, config.jwt_secret)
    }]
}


const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Sanjana Priya',
    email: 'sanjana@gmail.com',
    password: 'Sanjana@123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, config.jwt_secret)
    }]
}

const setupDatabase = async () => {
    await user.deleteMany()
    await new user(userOne).save()
    await new user(userTwo).save()
}

module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    setupDatabase
}