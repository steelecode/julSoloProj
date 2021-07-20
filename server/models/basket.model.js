const mongoose = require('mongoose');

const BasketSchema = new mongoose.Schema({
    type: { 
        type: String,
        required: [true, "Type is required for Baskets"],
        enum: [
            "Calming",
            "Energizing",
            "Manifesting",
            "Immunity Boosting",
            "Digestion Aid"
        ],
    },
    numberItems: { 
        type: Number,
        required: [3, "Basket must have at least 3 items"] 
    },
    message: { type: String },
    gift: { 
        type: Boolean,
        default: false 
    },
    items: { 
        type: String,
        required: [true, "Item is required for Baskets"],
        enum: [ 
            "Nettle Leaf",
            "Lavender",
            "Chamomille",
            "Marshmallow Root",
            "Lemon Balm",
            "Mullein Leaf",
            "Golden Milk",
            "Burdock Root"
        ] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Basket', BasketSchema);

