mapboxgl.accessToken = 'pk.eyJ1IjoiaXcwMCIsImEiOiJjbTV2aXFlajYwMjZmMmtvbWtrMGRhd3lkIn0.DbEVxhgWv4ANYwpIpCc4iA'; //***ADD YOUR ACCESS TOKEN HERE***

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard', // or select existing mapbox style - https://docs.mapbox.com/api/maps/styles/
    center: [-79.340, 43.730],
    zoom: 9.61
});

// Add zoom and rotation controls to the top left of the map
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());

map.on('load', () => {

    map.addSource('mpp-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/scarbenvmaps/mp-landlord-map/refs/heads/main/data/toronto_electoral_districts.geojson'
    });

    map.addLayer({
        'id': 'mpp-fill',
        'type': 'fill',
        'source': 'mpp-data',
        'paint': {
            'fill-color': 'purple',
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        }
    });
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'mpp-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'mpp-fill', () => {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'mpp-fill', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML(e.features[0].properties.ENGLISH_NA + "<br>" + e.features[0].properties.MPP) //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
});