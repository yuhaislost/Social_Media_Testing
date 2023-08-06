import mongoose from 'mongoose';
import validator from 'validator';
import validateUserName from '../validation/modelvalidation/usernameValidator.js';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "An unknown man shall not pass, please enter a username!"],
        validate: {
            validator: validateUserName,
            message: "Invalid characters in username",
        },
        minLength: 3,
        maxLength: 30,
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: [true, "Please enter a valid email!"],
        lowercase: true,
        unique: [true, "There is already an account with the same email"],
        validate:{
            validator: validator.isEmail,
            message: "Please provide a valid email",
        }
    },
    biography:{
        type: String,
        maxLength: 150,
    },
    profileImage:{
        type: String,
    },
    profileCoverImage:{
        type: String,
    },
    birth:{
        type: Date,
        required: [true, 'Please provide a birth date!']
    },
    password:{
        type: String,
        required: [true, 'You must provide a password!'],
        select: false
    },
    passwordChangedAt: Date,
    active:{
        type: Boolean,
        required: [true, 'An account active status must be set!'],
        default: true,
        select: false
    }
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}, timestamps: true});


userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();

    this.passwordChangedAt = Date.now() - 1000;

    next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel;