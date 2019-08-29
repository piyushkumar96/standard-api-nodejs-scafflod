/*
 *This file contains user Model require for creating user
*/
'use strict';

//External modules
const   mongoose    = require('mongoose'),
        validator   = require('validator'),
        bcrypt      = require('bcryptjs'),
        jwt         = require('jsonwebtoken');

//Internal modules
const   config    = require('../../../config.json');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) {
                throw new Error('Age must be a postive Number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// methods are defined on the documents(instance)
// this method restrict the confidential data while fetching user from database
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// this method is used for generating token for user
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user.id.toString()}, config.jwt_secret , { expiresIn: config.jwt_expiretime })

    user.tokens = user.tokens.concat({ token})
    await user.save()
    return token
}

// statics are the methods defined on the Model
// checking that user exits or not
userSchema.statics.findByCrendentials = async (email, password) => {
    const user = await users.findOne({"email": email})

    if(!user) {
        throw new Error("Authentication failed")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Authentication failed')
    }

    return user
}

//Hash the p[lain text password before saving 
userSchema.pre('save', async function (next){
    const user = this 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const users = mongoose.model('users', userSchema);
module.exports = users
