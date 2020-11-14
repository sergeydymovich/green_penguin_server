const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  	name: { type: String, required: true },
		volume: { type: String },
		weight: { type: String },
		price: { type: String },
		image: { data: Buffer  , contentType: String  },
		category: { type: String, required: true },
		brand: { type: String, required: true }
}, { 
	timestamps: true 
});



module.exports = mongoose.model('Product', userSchema);