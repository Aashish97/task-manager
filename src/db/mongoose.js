const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

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

const me = new User({
  name: 'Aashish',
  email: ' ITSMEASIS98@GMAIL.COM',
  password: 'Password123'
});

me.save()
  .then(() => console.log(me))
  .catch(error => console.log(error));

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

const task = new Task({
  description: ' Learn mongoose ',
});

task
  .save()
  .then(() => console.log(task))
  .catch(error => console.log(error));
