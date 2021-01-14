const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	name: { type: String },
	subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategories"}],
	brands: [{ type: Schema.Types.ObjectId, ref: "Brand"}]
}, {
timestamps: true, 
});

module.exports = mongoose.model('Category', categorySchema);