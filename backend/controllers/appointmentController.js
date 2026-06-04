const appointment = require("../models/appointment");

const createAppointment = async (req, res) => {
  try {
    const data = {
      user_id: req.user_id || req.user?._id?.toString() || req.body.user_id,
      day: req.body.day,
      time_slot: req.body.time_slot ?? req.body.timeSlot,
      info: req.body.info ?? req.body.type,
      description: req.body.description,
    };

    const appoint = new appointment(data);
    await appoint.save();
    res.status(201).json(appoint);
  } catch (err) {
    console.log("Appointment save error:", err.message, req.body);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAppointment,
};
