const Product = require('../models/product.js');
const Category = require('../models/category.js');

module.exports = {
	addProduct: (req, res) => {	
		const { name, volume, weight, price, category, subCategory, brand, description } = req.body;
		const subCategObj = subCategory ? { $addToSet: { subcategories: subCategory, brands: brand} } : { $addToSet: { brands: brand } } ;

		Category.update({name : category }, subCategObj, {upsert: true}, (err) => {
			if (err) {
				console.log(err)			
			} else {
				console.log("succes");
			}
		} )

		Product.create({
			name,
			volume,
			weight,
			price,
			category,
			subCategory,
			brand,			
			description,
			image: req.file.path	 
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
		const brands = req.param("brands");
		const sort = req.param("sort");
		const filterWord = req.param("word");
		const limit = req.param("limit");
		const offset = req.param("offset");

		let findObj = {};
		if (category) findObj.category = category;
		if (subCategory) findObj.subCategory = subCategory;
		if (brands) findObj.brand = { $in: brands.split(",") };
		if (filterWord) findObj.name = { $regex : filterWord, $options :  'i' };

		let sortObj = {};
		if (!sort) sortObj = { _id: -1};
		if (sort === "price") sortObj = { price: -1 };
		if (sort === "alphabet") sortObj = { name: 1 };
		
		Product.count(findObj).then(count => Product.find(findObj).limit(Number(limit)).skip(Number(offset)).sort(sortObj).exec((err, products) => {
			if (err) {
			 res.status(400).json({ succes: false })		 
			} else {
				 res.json({ products, count })	
			}
		 }))
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
		const subCategObj = subCategory ? { $addToSet: { subcategories: subCategory, brands: brand} } : { $addToSet: { brands: brand } } ;
		const img = req.file ?  req.file.path : image;
		
		Category.update({name : category }, subCategObj, {upsert: true}, (err) => {
			if (err) {
				console.log(err)			
			} else {
				console.log("succes");
			}
		})

		Product.updateOne({ _id },
			{
				$set: {
					name, volume, weight, price, category, subCategory, brand, description, image: img,
				}  
		}, (err, product) => {
			if (err) {
				console.log(err)
				res.status(400).json({ succes: false })
				
			} else {

				res.json({ product })
			}
		}) 
	},

}



