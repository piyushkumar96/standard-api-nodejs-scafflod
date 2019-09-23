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
   

    //update the user's profile
    app.route('/api/v1/updateUser')
       .patch(authentication.auth, usersController.updateUser)
   
    //update the user's password
    app.route('/api/v1/updatePassword')
       .patch(authentication.auth, usersController.updatePassword)
   
   //delete the user
   app.route('/api/v1/deleteUser')
   .delete(authentication.auth, usersController.deleteUser)
};
