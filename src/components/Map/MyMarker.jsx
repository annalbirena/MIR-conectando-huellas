/* eslint-disable react/prop-types */
import { Button, Image, Stack, Text } from '@mantine/core';
import { IconPawFilled } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Link } from 'react-router-dom';

function MyMarker({ pet, isLost }) {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <Marker
      longitude={pet.pet.location_longitude}
      latitude={pet.pet.location_latitude}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setPopupInfo(pet);
      }}
    >
      <IconPawFilled size={32} color={isLost ? '#ff0000' : '#4263eb'} />
      {popupInfo && (
        <Popup
          anchor="top"
          closeButton={false}
          longitude={popupInfo.pet.location_longitude}
          latitude={popupInfo.pet.location_latitude}
          onClose={() => setPopupInfo(null)}
        >
          <Stack>
            {isLost ? (
              <Text>
                Me llamo{' '}
                <Text span fw={600}>
                  {popupInfo.pet.name}
                </Text>{' '}
                y me perdí aquí!
              </Text>
            ) : (
              <Text>
                Me llamo{' '}
                <Text span fw={600}>
                  {popupInfo.pet.name}
                </Text>{' '}
                y estoy buscando mi nuevo compañero!
              </Text>
            )}

            <Image
              src={popupInfo.pet.imageUrl}
              alt="Foto de mascota"
              radius="sm"
              h={200}
            />
            <Link
              to={`/${isLost ? 'perdidos' : 'adopcion'}/${pet.id}`}
              target="_blank"
            >
              <Button w="100%" variant="filled" color="dark">
                Más información
              </Button>
            </Link>
          </Stack>
        </Popup>
      )}
    </Marker>
  );
}

export default MyMarker;
