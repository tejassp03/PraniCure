// Define the coordinates of two points
const L = require('leaflet');

const point1 = L.latLng(37.7749, -122.4194);
const point2 = L.latLng(34.0522, -118.2437);

// Calculate the distance between the points
const distance = point1.distanceTo(point2);

console.log('Distance:', distance, 'meters');
