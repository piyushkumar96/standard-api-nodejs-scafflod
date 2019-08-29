/*
 *This file contains users creation, login, updatation routes
*/
'use strict';

module.exports = function (app) {

    const usersController = require('../../controllers/users/usersCntrl');
    
    
    app.route('/api/v1/createUser')
       .post(usersController.createUser)
};

