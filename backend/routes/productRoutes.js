const router=require("express").Router()
const Product=require('../models/Product')
const User=require('../models/User')

//get Products

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//create a new product

router.post('/', async (req, res) => {
    try {
        const{name, description,price,category,images:pictures}=req.body;
        const product = await Product.create({name, description, price, category, pictures});
        const products=await Product.find()
        res.status(201).json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


//update a product
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { name, description, price, category, images: pictures } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, pictures });
        if (!product) return res.status(404).send('Product not found');
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


//delete product

router.delete('/:id', async (req, res) => {
    const {id}=req.params;
    const{user_id}=req.body
    try {
        const user=await User.findById(user_id)
        if(!user.isAdmin) return res.status(401).send('You do not have permission to delete this product');
        const product = await Product.findByIdAndDelete(id);
        if(!product) return res.status(404).send('Product not found');
        const products=await Product.find()
        res.status(200).json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

//get one product
router.get('/:id', async (req, res) => {
    const {id}=req.params
    try {
        const product = await Product.findById(id);
        const similar=await Product.find({category:product.category}).limit(5)
        res.status(200).json({product, similar});
    } catch (err) {
        res.status(400).send(err.message);
    }
});

//get products by category

router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        let products;
        if (category === "all") {
            products = await Product.find().sort([["date", -1]]);
        } else {
            products = await Product.find({ category });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;