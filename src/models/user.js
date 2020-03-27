const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email address')
            }
        }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value){
          if (value.toLowerCase().includes('password')) {
              throw new Error('You cannot use password as "password"');
          }
      }
    },
    age: {
      type: Number,
      default: 0,
      validate(value){
          if(value < 0){
              throw new Error('Age must be positive');
          }
      }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Hiding the private data
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

//for the jwt authentication token which defines the methods
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisissecrectkey');

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

//for the login module that uses custom function findByCredentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( { email } );
    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user;
}


// Middleware that runs before the saving event and next is called when the process is over
userSchema.pre('save', async function(next){
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

//Middleware that deletes all tasks when user is deleted
userSchema.pre('remove', async function(next){
    const user = this;

    await Task.deleteMany({ owner: user._id });
    next();
})


const User = mongoose.model("User", userSchema);

module.exports = User;