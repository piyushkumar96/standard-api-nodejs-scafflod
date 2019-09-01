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

    // logout current session of the user
    app.route('/api/v1/logoutCS')
       .post(authentication.auth, usersController.logoutCS)

    // logout all sessions of the user
    app.route('/api/v1/logoutAS')
       .post(authentication.auth, usersController.logoutAS)
   

    //update the user profile
   //  app.route('/api/v1/login')
   //     .patch(authentication.auth, usersController.getUser)
};

