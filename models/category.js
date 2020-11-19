const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, unique: true, },
	subcategories: { type: Array },
}, {
timestamps: true, 
});

module.exports = mongoose.model('Category', userSchema);