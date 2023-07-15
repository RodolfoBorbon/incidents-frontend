let mongoose = require('mongoose');

// create order model class
let Order = mongoose.Schema({
    name: String,
    occupation: String,
    attitude: String,
    gender: String,
    postalCode: String,
    country: String,
    shipped: Boolean,
    cart:
    {
        lines:
        [{survey:
            {
                name: String,
                occupation: String,
                attitude: String,
                gender: String,
                feedbaack: String,
            },
            quantity: Number
        }],
        itemCount: Number,
        cartPrice: Number
    }
},
{
    collection: 'orders'
});

module.exports = mongoose.model('Order', Order);