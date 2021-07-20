const BasketController = require('../controllers/basket.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {

    // get all baskets
    app.get("/api/baskets", BasketController.getAllBaskets);
    // create basket
    app.post("/api/baskets", authenticate, BasketController.createBasket);
    // get one basket
    // create a param variable called "id"
    app.get("/api/baskets/:id", BasketController.getOneBasket);
    // update basket
    app.put("/api/baskets/:id", BasketController.updateBasket);
    // delete basket
    app.delete("/api/baskets/:id", BasketController.deleteBasket);
    
}