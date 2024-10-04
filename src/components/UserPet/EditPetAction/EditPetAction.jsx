import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import EditPetForm from './EditPetForm';
import classes from './editpetaction.module.css';

function EditPetAction({ data }) {
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

      <EditPetForm data={data} isOpen={isOpen} close={close} onClose={close} />
    </>
  );
}

EditPetAction.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
  }).isRequired,
};

export default EditPetAction;
