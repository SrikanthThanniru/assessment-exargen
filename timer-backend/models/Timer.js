const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    assessment_start_time: { type: Date, required: true },
    assessment_end_time: { type: Date },
});

module.exports = mongoose.model('Timer', timerSchema);
