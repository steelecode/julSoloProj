const { createIndexes } = require('../models/basket.model');
const Basket = require('../models/basket.model');

// get all baskets
module.exports.getAllBaskets = (req, res) => {
    console.log("Inside getAllBaskets");

    Basket.find( { } ) // find all basket documents
        .then((allBaskets) => {
            console.log("allBaskets");
            res.json(allBaskets);
        })
        .catch((err) => {
            console.log(err);
        })
};

// create basket
module.exports.createBasket = (req, res) => {
    console.log("Inside createBasket");
    console.log(req.body);

    Basket.create(req.body)
        .then((newBasket) => {
            console.log(newBasket);
            res.json(newBasket);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
};
// get one basket
module.exports.getOneBasket = (req, res) => {
    console.log("inside GetOneBasket");
    console.log(req.params.id);

    Basket.findById(req.params.id)
    .then((oneBasket) => {
        console.log(oneBasket);
        res.json(oneBasket);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
};

// update basket
module.exports.updateBasket = (req, res) => {
    console.log("update GetOneBasket");
    console.log(req.params.id); // the document we need to update
    console.log(req.body); // the data we will be updating with

    Basket.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return updated doc instead of original
        runValidators: true
    })
    .then((updatedBasket) => {
        console.log(updatedBasket);
        res.json(updatedBasket);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
};

// delete basket
module.exports.deleteBasket = (req, res) => {
    console.log("inside deleteBasket");
    console.log(req.params.id);

    Basket.findByIdAndDelete(req.params.id)
    .then((deletedBasket) => {
        // this is the deleted document
        console.log(deletedBasket);
        res.json(deletedBasket);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    })
};
