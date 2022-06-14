const Product = require("../models/Product")

exports.createProduct = async (req, res) => {

    try {
        let product;
        //Create product
        product = new Product(req.body);

        await product.save();
        res.send(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error on the server');
    }
}

exports.getProducts = async (req, res) => {

    try {

        const product = await Product.find();
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error on the server');
    }
}

exports.updateProduct = async (req, res) => {

    try {

        const { name, category, price, status } = req.body;
        let product = await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({msg:'Product not found, try with other product'})
        }

        product.name = name;
        product.category = category;
        product.price = price;
        product.status = status;

        product = await Product.findOneAndUpdate({_id : req.params.id}, product, {new:true})
        res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error on the server');
    }
}

exports.getProduct = async (req, res) => {

    try {

        let product = await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({msg:'Product not found, try with other product'})
        }

        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error on the server');
    }
}

exports.deleteProduct = async (req, res) => {

    try {

        let product = await Product.findById(req.params.id);

        if(!product){
            res.status(404).json({msg:'Product not found, try with other product'})
        }

        await Product.findOneAndRemove({_id: req.params.id})
        res.json({msg:"Product deleted successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error on the server');
    }
}