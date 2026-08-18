const express = require('express');
const recommendationsController = require('../controllers/recommendations');

const router = express.Router();

router.get('/', recommendationsController.getRecommendations);
router.post('/', recommendationsController.createRecommendation);

module.exports = router;

  
