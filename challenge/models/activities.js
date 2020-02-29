const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  description: String,
  creationDate: { type: Date, default: Date.now },
  owner: {type: Schema.Types.ObjectId, ref: 'Users'},
  challenge: {type: Schema.Types.ObjectId, ref: 'Challenges'},
  rejected: Boolean,
  approved: Boolean,
  approvalDate: Date,
  approver: {type: Schema.Types.ObjectId, ref: 'Users'}
});

const Activities = mongoose.model("Activities", activitySchema);

module.exports = Activities;