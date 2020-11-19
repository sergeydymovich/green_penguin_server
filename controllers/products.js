const Product = require('../models/product.js');
const Category = require('../models/category.js');

module.exports = {
	addProduct: (req, res) => {	
		const { name, volume, weight, price, category, subCategory, brand, description, image } = req.body;


		Category.update({name : category},{$addToSet: { subcategories: subCategory}}, {upsert: true}, (err, cat) => {
			if (err) {
				console.log("err",err)		
			} else {
				console.log("category:",cat)
			}
		})

		// {$regex : subCategory, $options :  'i' }  {$regex : category, $options :  'i' }

		Product.create({
			name,
			volume,
			weight,
			price,
			category,
			subCategory,
			brand,			
			description,
			image			 
		}, (err, product) => {
			if (err) {
				res.status(400).json({ errorMessage: err._message })			
			} else {
				res.status(201).json({
					product
				})
			}
		}) 
	},
	getProducts: (req, res) => {

		Product.find({}, (err, products) => {
			if (err) {
				console.log("error", err)
				res.status(400).json({ succes: false })
				
			} else {
				res.json({ 
				products
				 })
			}
		})		
	 },
	 deleteProduct: (req, res) => {
		const { id } = req.body;
	
		Product.deleteOne({
			_id: id
		}, (err) => {
			if (err) {
				res.status(400).json({ succes: false })
				
			} else {
				res.status(201).json({
					succes: true,
				})
			}
		}) 
	},
	changeProduct: (req, res) => {
		const { name, volume, weight, price, category, subCategory, brand, description, image, _id } = req.body;
	
		Product.updateOne({ _id },
			{
				$set: {
					name, volume, weight, price, category, subCategory, brand, description, image,
				}  
		}, (err, product) => {
			if (err) {
				res.status(400).json({ succes: false })
				
			} else {

				res.json({ product })
			}
		}) 
	},

}



