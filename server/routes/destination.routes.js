const express = require('express')

const{
    handleCreateDestination,
    handleGetAllDestinations,
    handleGetDestinationById,
    handleDeleteDestinationByID,
    handleUpdateDestinationById
} = require('../controllers/destination.controller')

const router = express.Router();

router.get('/', handleGetAllDestinations)
router.get('/:id', handleGetDestinationById)
router.post('/', handleCreateDestination)
router.put('/:id', handleUpdateDestinationById)
router.delete('/:id', handleDeleteDestinationByID)

module.exports = {destinationRouter: router};