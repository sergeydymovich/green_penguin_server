const Category = require('../models/category.js');

module.exports = {
	getCategories: (req, res) => { 
		Category.find({}, (err, categories) => {
			if (err) {
				res.status(400).json({ succes: false })		
			} else {	
						res.json({ categories })		
			}
		})		
	 },

}