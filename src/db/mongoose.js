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
  email: ' ITSMEASIS98@GMAIL.COM'
});

me.save()
  .then(() => console.log(me))
  .catch(error => console.log(error));

const Task = mongoose.model('Task', {
  description: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
  }
});

const task = new Task({
  description: 'Learn mongoose',
  completed: false
});

// task
//   .save()
//   .then(() => console.log(task))
//   .catch(error => console.log(error));
