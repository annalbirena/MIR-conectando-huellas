/* eslint-disable react/require-default-props */
import * as React from 'react';
import { Box } from '@mantine/core';
import 'maplibre-gl/dist/maplibre-gl.css';
import MapLibreGl from 'maplibre-gl';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Map, Marker } from 'react-map-gl';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: 5,
};

const viewPort = {
  latitude: -12.113887,
  longitude: -77.033996,
  zoom: 10,
};

function PetMapCard({ location = null }) {
  const mapRef = useRef(null);

  return (
    <Box h={400}>
      <Map
        ref={mapRef}
        initialViewState={viewPort}
        mapLib={MapLibreGl}
        style={containerStyle}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=vRaFa8XivVdO0slo056m"
      >
        {location ? (
          <Marker
            latitude={location.latitude}
            longitude={location.longitude}
            color="red"
          />
        ) : null}
      </Map>
    </Box>
  );
}

PetMapCard.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    PropTypes.oneOf([null]),
  ]),
};

export default PetMapCard;
