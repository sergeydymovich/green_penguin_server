const Category = require('../models/category.js');
const Brand = require('../models/brand.js');

module.exports = {

	getCategories: (req, res) => {
	 
		Category.find({}, (err, categories) => {

			if (err) {
				res.status(400).json({ succes: false })		
			} else {
				Brand.find({}, (error, brands) => {
					if (error) {
						console.log(error);
					} else {
						res.json({ 
							categories,
							brands
							 })
					}
				});			
			}
		})		
	 },

}