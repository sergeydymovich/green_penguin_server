const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  	name: { type: String },
		volume: { type: String },
		weight: { type: String },
		price: { type: String },
		category: { type: String },
		subCategory: { type: String },
		brand: { type: String  },
		description: {type: String},
		image: { type: String }		
}, { 
	timestamps: true 
});



module.exports = mongoose.model('Product', userSchema);