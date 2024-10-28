import React from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import classes from './editpetaction.module.css';
import EditAdoptionPetForm from './EditAdoptionPetForm';
import EditLostPetForm from './EditLostPetForm';

function EditPetAction({ data, setPetsData, isLost }) {
  const [isOpen, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={open}
        variant="default"
        className={classes.modal}
        rightSection={<IconEdit size={20} />}
      >
        Editar
      </Button>
      {isLost ? (
        <EditLostPetForm
          data={data}
          isOpen={isOpen}
          close={close}
          onClose={close}
          setPetsData={setPetsData}
        />
      ) : (
        <EditAdoptionPetForm
          data={data}
          isOpen={isOpen}
          close={close}
          onClose={close}
          setPetsData={setPetsData}
        />
      )}
    </>
  );
}

EditPetAction.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
    statusLost: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specieId: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      location_latitude: PropTypes.number.isRequired,
      location_longitude: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setPetsData: PropTypes.func.isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default EditPetAction;
