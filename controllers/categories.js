const Category = require('../models/category.js');
const SubCategory = require('../models/subcategory.js');
const Brand = require('../models/Brand.js');

module.exports = {


	getCategories: (req, res) => { 

		Category.find({}).populate("subcategories").populate("brands").exec((error, categories) => {
      if (error) {
        res.status(400).json({ message: e.message })
      } else {
        console.log(categories)
        res.json({ categories })
      }
    })		
	 },
	 changeCategories(category, subCategory, brand) {

		if (subCategory) {
			SubCategory.update({ name : subCategory }, {}, {upsert: true}, (err, subCategoryRes) => {
				if (err) {
					console.log(err)			
				} else {
					if (subCategoryRes.nModified === 0) {
						Category.update({ name : category }, { $push: { subcategories: subCategoryRes.upserted[0]._id } }, {upsert: true}, (err) => {
							if (err) {
								console.log(err)			
							} 
						})
					}
				}
			})
		}
	
			Brand.update({ name : brand }, {}, {upsert: true},  (err, brandRes) => {
				if (err) {
					console.log(err)			
				} else {
					if (brandRes.nModified === 0) {
						Category.update({ name : category }, { $push: { brands: brandRes.upserted[0]._id } }, {upsert: true}, (err) => {
							if (err) {
								console.log(err)			
							} 
						})
					}
				}
	
			})


	
	}
}