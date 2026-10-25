const express = require('express');
const router = express.Router();
const { getPhotos, getVideos } = require('../controllers/galleryController');

router.get('/photos', getPhotos);
router.get('/videos', getVideos);

module.exports = router;
