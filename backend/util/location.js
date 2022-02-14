const axios  = require('axios');
const HttpError = require('../models/http-error');

const API_CONSTANT = 'AIzaSyC5y19C2VV0tRo01XIkjs0RXKl22pc9xv8';

async function getCoordsForAddress(address){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_CONSTANT}
    `);

    const data = response.data;

    if( !data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('could not find location', 422);
        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;