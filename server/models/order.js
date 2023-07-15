let mongoose = require('mongoose');

// create order model class
let Order = mongoose.Schema({
    name: String,
<<<<<<< HEAD
    occupation: String,
    attitude: String,
    gender: String,
=======
    address: String,
    city: String,
    province: String,
>>>>>>> origin/main
    postalCode: String,
    country: String,
    shipped: Boolean,
    cart:
    {
        lines:
<<<<<<< HEAD
        [{survey:
            {
                name: String,
                occupation: String,
                attitude: String,
                gender: String,
                feedbaack: String,
=======
        [{book:
            {
                name: String,
                author: String,
                published: String,
                description: String,
                price: Number
>>>>>>> origin/main
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