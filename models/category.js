const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String },
	subcategories: { type: Array },
	brands: { type: Array }
}, {
timestamps: true, 
});

module.exports = mongoose.model('Category', userSchema);