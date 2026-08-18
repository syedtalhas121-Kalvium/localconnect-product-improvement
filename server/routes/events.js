const express = require('express');
const eventsController = require('../controllers/events');

const router = express.Router();

router.get('/', eventsController.getEvents);
router.post('/', eventsController.createEvent);
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;

  
