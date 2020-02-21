const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: { type: String, required: true },
  status: String,
  duration: Number,
  unitCost: Number,
  currency: String,
  rules: String,
  creationDate: { type: Date, default: Date.now },
  owner: {type: Schema.Types.ObjectId, ref: 'Users'},
  participants: [{type: Schema.Types.ObjectId, ref: 'Users'}]
});

const Challenges = mongoose.model("Challenges", challengeSchema);

module.exports = Challenges;