const Category = require('../models/category.js');
const SubCategory = require('../models/subcategory.js');
const Brand = require('../models/Brand.js');

module.exports = {
	getCategories: (req, res) => { 
		Category.find({}).populate("subcategories").populate("brands").exec((error, categories) => {
      if (error) {
        res.status(400).json({ message: e.message })
      } else {
        res.json({ categories })
      }
    })		
	 },

	async changeCategories(category, subCategory, brand) {
		const subCategoryResponce =  await SubCategory.findOneAndUpdate({ name : subCategory }, {}, {upsert: true, new: true})
		const brandResponce =  await Brand.findOneAndUpdate({ name : brand }, {}, {upsert: true, new: true})
		
		Category.findOneAndUpdate(
			{ name : category },
			{ $addToSet: {
					subcategories: subCategoryResponce._id,
					brands: brandResponce._id
				} 
			},
			{
				upsert: true,
				new: true
			},
			(err) => {
			if (err) {
				console.log(err)
			}
		}) 
	},
}
