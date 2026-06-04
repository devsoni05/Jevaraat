const mongoose = require("mongoose");
const appointmentSchema = require("../schema/appointment");

const appointment = mongoose.model("appointment", appointmentSchema);

module.exports = appointment;
