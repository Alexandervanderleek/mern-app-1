const express = require('express');

const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controlers');

const router = express.Router();


router.get('/:pid', placesControllers.getPlaceByID);

router.get('/user/:uid', placesControllers.getUserPlaceById );

router.post('/',
    [check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty()]
    , placesControllers.createPlace);

router.patch('/:pid',
[
    check('title').not().isEmpty(),
    check('description').isLength({min: 5})
], placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace)

module.exports = router;