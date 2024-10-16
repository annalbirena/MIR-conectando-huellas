import React from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import classes from './editpetaction.module.css';
import EditAdoptionPetForm from './EditAdoptionPetForm';
import EditLostPetForm from './EditLostPetForm';

function EditPetAction({ data, isLost }) {
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
        />
      ) : (
        <EditAdoptionPetForm
          data={data}
          isOpen={isOpen}
          close={close}
          onClose={close}
        />
      )}
    </>
  );
}

EditPetAction.propTypes = {
  data: PropTypes.shape({
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      age: PropTypes.shape({
        number: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      lostDate: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      state: PropTypes.string.isRequired,
      image: PropTypes.shape().isRequired,
      description: PropTypes.string.isRequired,
    }),
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
    userId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default EditPetAction;
