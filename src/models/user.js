const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model("User", {
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
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
    }
});

module.exports = User;