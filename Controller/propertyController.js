const asynchandler = require('express-async-handler')
const Property = require('../model/propertyModel')

// GET ALL PROPERTIES
const getProperties = asynchandler(async (req, res) => {
    const { city, minPrice, maxPrice, state, bedrooms, bathrooms, status, featured, tags } = req.query;
    let filter = {};

    if (city) filter.city = city;
    if (state) filter.state = state;
    if (bedrooms) filter.bedrooms = bedrooms;
    if (bathrooms) filter.bathrooms = bathrooms;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    if (tags) filter.tags = { $in: tags.split(',') };
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Optional: only show logged-in user's properties
    // filter.postedBy = req.user.id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sort = req.query.sort || '-createdAt';

    const properties = await Property.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    res.json({
        page,
        limit,
        total: properties.length,
        properties,
    });
});

// GET PROPERTY BY ID
const getPropertyById = asynchandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
        res.status(404);
        throw new Error("Property Not Found");
    }
    res.json(property);
});

// CREATE PROPERTY
const createProperty = asynchandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const {
        title,
        description,
        price,
        address,
        city,
        state,
        country,
        bedrooms,
        bathroom,
        image,
        status,
        featured,
        tags
    } = req.body;

    if (!title || !description || !price || !address || !city || !state || !country || !bedrooms || !bathroom || !status) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const uploadedImage = req.file ? req.file.path : image || null;

    const property = await Property.create({
        title,
        description,
        price,
        address,
        city,
        state,
        country,
        bedrooms,
        bathroom,
        image: uploadedImage,
        status,
        postedBy: req.user.id,
        featured: featured || false,
        tags: tags ? tags.split(',') : []
    });

    res.status(201).json(property);
});

// UPDATE A PROPERTY BY ID

const updatePropertyById = asynchandler(async (req, res) => {
    const properties = await Property.findById(req.params.id)

    if (!properties) {
        res.status(400)
        throw new Error("Property Not Found");
    }
    if (properties.postedBy.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User does not have permission to update another user");
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedProperty)
})

// DELETE A PROPERTY BY ID

const deletePropertyById = asynchandler(async (req, res) => {
    const properties = await Property.findById(req.params.id)
    if (!properties) {
        res.status(404)
        throw new Error("Property Not Found");
    }
    if (properties.postedBy.toString() !== req.user.id) {
        res.status(403)
        throw new Error("User does not have permission to delete another user");
    }

    const deletedProperties = await Property.findByIdAndDelete(req.params.id)
    res.json(deletedProperties)
})

module.exports = { getProperties, getPropertyById, createProperty, updatePropertyById, deletePropertyById }