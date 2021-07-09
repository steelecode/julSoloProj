const BasketController = require('../controllers/basket.controller');

module.exports = function(app) {

    // get all baskets
    app.get("/api/baskets", BasketController.getAllBaskets);
    // create basket
    app.post("/api/baskets", BasketController.createBasket);
    // get one basket
    app.get("/api/baskets/:id", BasketController.getOneBasket);
    // update basket
    app.put("/api/baskets/:id", BasketController.updateBasket);
    // delete basket
    app.delete("/api/baskets/:id", BasketController.deleteBasket);
    
}