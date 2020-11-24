// const { Schema, model } = require('mongoose');

// const userSchema = new Schema ({
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// })

// module.exports = model('User', userSchema)
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 authId: String,
 name: String,
 email: String,
 role: String,
 created: Date,
});

const User = mongoose.model('User', userSchema);
module.exports = User;