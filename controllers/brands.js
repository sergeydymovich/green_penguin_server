const Brand = require('../models/Brand.js');

module.exports = {
	getBrands: (req, res) => { 
		Brand.find({},  (error, brands) => {
      if (error) {
        res.status(400).json({ message: e.message })
      } else {
        res.json({ brands })
      }
    })		
	 },
}