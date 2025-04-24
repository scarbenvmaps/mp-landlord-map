mapboxgl.accessToken = 'pk.eyJ1IjoiaXcwMCIsImEiOiJjbTV2aXFlajYwMjZmMmtvbWtrMGRhd3lkIn0.DbEVxhgWv4ANYwpIpCc4iA'; //***ADD YOUR ACCESS TOKEN HERE***

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard', // or select existing mapbox style - https://docs.mapbox.com/api/maps/styles/
    center: [-79.340, 43.730],
    zoom: 9.61,
    maxBounds: [
        [140,0], // Southwest
        [25, 85]  // Northeast
    ],
});


map.on('load', () => {

    map.addSource('mpp-data', {
        type: 'geojson',
        data: 'data/toronto_electoral_districts.geojson'
    });

    map.addLayer({
        'id': 'mpp-fill',
        'type': 'fill',
        'source': 'mpp-data',
        'paint': {
            'fill-color': 'black', // Test alternative colours and style properties
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        }
    });
});