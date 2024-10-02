import * as React from 'react';
import { Box } from '@mantine/core';
import MapLibreGl from 'maplibre-gl';
import Map from 'react-map-gl/maplibre';

function MapCard() {
  function handleClick(e) {
    const { lat, lng } = e.lngLat;
    console.log(lat, lng);
  }

  return (
    <Box h={400}>
      <Map
        mapLib={MapLibreGl}
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 5,
        }}
        onClick={(e) => handleClick(e)}
        mapStyle="https://api.maptiler.com/maps/1d71cf3c-e33e-4a5e-b843-01ab183daad4/style.json?key=vRaFa8XivVdO0slo056m"
      />
    </Box>
  );
}

export default MapCard;
