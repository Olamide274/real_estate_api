const mongoose = require('mongoose')


const propertySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add the property title']
    },
    description: {
        type: String,
        required: [true, 'Please add the property description']
    },
    price: {
        type: Number,
        required: [true, 'Please add the property price']
    },
    address: {
        type: String,
        required: [true, 'Please add the property location']
    },
    city:{
        type: String,
        required: [true, 'Please add the property city']
    },
    state:{
        type: String,
        required: [true, 'Please add the property state']
    },
     country:{
        type: String,
        required: [true, 'Please add the property country']
    },
    bedrooms: {
        type: String,
        required: [true, 'Please add the property bedrooms']
    },
    bathroom: {
        type: String,
        required: [true, 'Please add the property bathroom']
    },
    image: {
        type: [String],
        required: [true, 'Please add the property image URL']
    },
    views: {
        type: Number,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String],
        default: []
    },
    status:{
        type: String,
        enum: ['Available', 'Sold', 'Pending'],
        required: [true, 'Please add the property status']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Property',propertySchema)