const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/checkout');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Mongo DB connected!');
});

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: Number,
  },
  phone: String,
  creditCard: Number,
  expirationDate: String,
  cvv: Number,
  billingZip: Number,
});

const User = mongoose.model('User', userSchema);

// checkout: save user information
const saveInfo = (username, data) => new Promise((resolve, reject) => {
  // const newUser = new User(data);
  // let username = data.name;

  User.findOneAndUpdate({ name: username }, data, { upsert: true }).exec((err, response) => {
    if (err) {
      reject(err);
    } else {
      console.log(response);
      resolve(response);
    }
  });
});

// confirmation: find all information for the user and send back to server
const getUserInfo = username => new Promise((resolve, reject) => {
  User.find({ name: username }).exec((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(JSON.stringify(data[0]));
    }
  });
});


// saveInfo({ name: 'mo', email: '2000prcs@gmail.com', password: 'test' });

module.exports = {
  db,
  saveInfo,
  getUserInfo,
};
