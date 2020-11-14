const Product = require('../models/product.js');

module.exports = {
	addProduct: (req, res) => {
		const { name, volume, weight, price, image, category, brand } = req.body;
	
		Product.create({
			name,
			volume,
			weight,
			price,
			image,
			category,
			brand
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
	}
}



