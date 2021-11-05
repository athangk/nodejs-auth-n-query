const mongoose = require("mongoose")

const UserAnalyticSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  logins: [Number],
})

module.exports = mongoose.model("user_analytic", UserAnalyticSchema)
