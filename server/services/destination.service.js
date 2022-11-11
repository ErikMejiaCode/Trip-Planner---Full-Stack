const {Destination} = require('../models/destination.model')

const createDestination = async (data) => {
    console.log('service: createDestination');
    const destination = await Destination.create(data);
    return destination;
}

const getAllDestinations = async () => {
    console.log('service: getAllDestinations')
    const destinations = await Destination.find();
    return destinations;
}

const getDestinationById = async (id) => {
    console.log('service: getDestinationById')
    const destination = await Destination.findById(id);
    return destination;
}

const deleteDestinationById = async (id) => {
    console.log('service: deleteDestinationById')
    const destination = await Destination.findByIdAndDelete(id);
    return destination;
}

const getDestinationByIdAndUpdate = async (id, data) => {
    console.log('service: getDestinationByIdAndUpdate')
    const destination = await Destination.findByIdAndUpdate(id, data, {
        //re-run our validations upon updated
        runValidators: true,
        //return the updated destination.
        new: true
    });
    return destination;
}

module.exports = {
    createDestination,
    getAllDestinations,
    getDestinationById,
    deleteDestinationById,
    getDestinationByIdAndUpdate
};