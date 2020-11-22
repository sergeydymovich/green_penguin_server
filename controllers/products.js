const Product = require('../models/product.js');
const Category = require('../models/category.js');

module.exports = {
	addProduct: (req, res) => {	
		const { name, volume, weight, price, category, subCategory, brand, description, image } = req.body;

		const subCategObj = subCategory ? {$addToSet: { subcategories: subCategory}} : {};
		
		Category.update({name : category},subCategObj, {upsert: true}, (err, cat) => {
			if (err) {
				console.log("err",err)		
			} else {
				console.log("category:",cat)
			}
		})
		

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
		const category = req.param('category');
		const subCategory = req.param('subcategory');
		const limit = req.param("limit");
		const offset = req.param("offset");
		let findObj = category ? { category: category } : {};
		if (subCategory) {
			findObj = { category: category,  subCategory: subCategory }
		}

		
		Product.count().then(count => Product.find(findObj).limit(Number(limit)).skip(Number(offset)).exec((err, products) => {
			if (err) {
			 res.status(400).json({ succes: false })		 
			} else {
				if (category || subCategory) {
					 Product.find(findObj).count().exec((err, amount) => {
						if (err) {
							res.status(400).json({ succes: false })
							
						} else {
							res.json({ products, count: amount })
						}
					});
				} else {	
							
				 res.json({ products, count })
				}			
			}
		 }) )
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
		const subCategObj = subCategory ? {$addToSet: { subcategories: subCategory}} : {};
		
		Category.update({name : category},subCategObj, {upsert: true}, (err, cat) => {
			if (err) {
				console.log("err",err)		
			} else {
				console.log("category:",cat)
			}
		})
	
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



