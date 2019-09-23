/*
 * This file contains all test cases for users
*/
'use strict';

//External Modules 
const   request = require('supertest');

// Internal Modules
const   server = require('../../../server'),
        userModel = require('../../models/users/usersModel');

const { userOneId, userOne, setupDatabase } = require('../fixtures/users/users')

beforeEach(setupDatabase)

// test for creating the new User
test('Should create a New User', async () => {
    const response = await request(server)
        .post('/api/v1/createUser')
        .send({
            name: 'Piyush Kumar',
            email: 'piyush@gmail.com',
            password: 'Piyush@123'
        })
        .expect(201)

    // Assert that the DB was changed successfully
    const user = await userModel.findById(response.body.message.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body.message).toMatchObject({
        user: {
            name: 'Piyush Kumar',
            email: 'piyush@gmail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('Piyush@123')
})

// test for login Process
test('Should login existing user', async () => {
    const response = await request(server)
        .post('/api/v1/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    const user = await userModel.findById(userOneId)
    expect(response.body.message.token).toBe(user.tokens[1].token)

})

// test for authentication failed
test('Should not login nonexistent user', async () => {
    await request(server)
        .post('/api/v1/login')
        .send({
        email: userOne.email,
        password: 'IncorrectPassword'
        })
        .expect(400)
})

//test for getting the user profile
test('Should get profile for user', async () => {
    await request(server)
        .get('/api/v1/user/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

// test for authentication failed for getting user profile
test('Should not get profile for unauthenticated user', async () => {
    await request(server)
        .get('/api/v1/user/me')
        .send()
        .expect(401)
})

// test for deleting the user
test('Should delete the user', async () => {
    await request(server)
        .delete('/api/v1/deleteUser')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await userModel.findById(userOneId)
    expect(user).toBeNull()
})

// test for authentication failed for deleting the user
test('Should not delete account for unauthenticate user', async () => {
    await request(server)
        .delete('/api/v1/deleteUser')
        .send()
        .expect(401)
})

// test for updating the valid user fields
test('Should update valid user fields', async () => {
    await request(server)
        .patch('/api/v1/updateUser')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            age: '26'
        })
        .expect(200)
    const user = await userModel.findById(userOneId)
    expect(user.age).toEqual(26)
})

