const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true },
  email: {type: String, required: true },
  firebaseId: {type: String, required: true},
  photoUrl: String,
  creationDate: { type: Date, default: Date.now },
  challenges: [{ type: Schema.Types.ObjectId, ref: 'Challenges' }]
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
