const mongoose =  require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address: {
        street: String,
        city: {
            type: String,
            required: true,
        },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds: [
        {
            // Books use Mixed _id (e.g. numeric seeds); must match for orders to save
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

const Order =  mongoose.model('Order', orderSchema);

module.exports = Order;