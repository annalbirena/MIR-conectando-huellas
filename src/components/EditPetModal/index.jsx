import { Modal, Text } from '@mantine/core';
import PropTypes from 'prop-types';

function EditPetModal({ opened, close }) {
  return (
    <Modal opened={opened} onClose={close} title="Editar Mascota" centered>
      <Text>modal</Text>
    </Modal>
  );
}

EditPetModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default EditPetModal;
