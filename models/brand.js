const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
	name: { type: String },
}, {
timestamps: true, 
});

module.exports = mongoose.model('Brand', brandSchema);