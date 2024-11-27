/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import { IconPawFilled } from '@tabler/icons-react';
import { Checkbox, Group, Paper, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import classes from './map.module.css';

function ControlPanel({ onFilterChange }) {
  const [value, setValue] = useState([]);

  const handleCheckboxChange = (newValue) => {
    setValue(newValue);
    onFilterChange(newValue);
  };

  // AAl renderizarse marcar ambas opciones para mostrar todas las mascotas
  useEffect(() => {
    handleCheckboxChange(['lost', 'adoption']);
  }, []);

  return (
    <Paper className={classes.controlPanel} shadow="xs" p="lg" m="md">
      <Checkbox.Group value={value} onChange={handleCheckboxChange}>
        <Stack>
          <Checkbox
            value="lost"
            color="purpleBrand.3"
            label={
              <Group gap="xs">
                <Text>Perdidos</Text>
                <IconPawFilled size={16} color="#ff0000" />
              </Group>
            }
          />
          <Checkbox
            value="adoption"
            color="purpleBrand.3"
            label={
              <Group gap="xs">
                <Text>En Adopción</Text>
                <IconPawFilled size={16} color="#4263eb" />
              </Group>
            }
          />
        </Stack>
      </Checkbox.Group>
    </Paper>
  );
}

export default ControlPanel;
