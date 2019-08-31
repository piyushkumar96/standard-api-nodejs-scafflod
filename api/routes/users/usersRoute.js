/*
 *This file contains users creation, login, updatation routes
*/
'use strict';

module.exports = function (app) {

    const   usersController = require('../../controllers/users/usersCntrl'),
            authentication = require('../../middleware/auth');
    
    // create user route
    app.route('/api/v1/createUser')
       .post(usersController.createUser)

    // login user route
    app.route('/api/v1/login')
       .post(usersController.loginUser)

    // get the user
    app.route('/api/v1/user/me')
       .get(authentication.auth, usersController.getUser)
};

