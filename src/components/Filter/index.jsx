import { Accordion, Checkbox, Stack, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import PropTypes from 'prop-types';

function Filters({ isLost }) {
  return (
    <Stack>
      <Title order={4}>Filtrar por</Title>
      <Accordion w={200}>
        <Accordion.Item value="especie">
          <Accordion.Control>Especie</Accordion.Control>
          <Accordion.Panel>
            <Checkbox.Group>
              <Stack mt="xs">
                <Checkbox value="perro" label="Perro" />
                <Checkbox value="gato" label="Gato" />
                <Checkbox value="otro" label="Otro" />
              </Stack>
            </Checkbox.Group>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="sexo">
          <Accordion.Control>Sexo</Accordion.Control>
          <Accordion.Panel>
            <Checkbox.Group>
              <Stack mt="xs">
                <Checkbox value="macho" label="Macho" />
                <Checkbox value="hembra" label="Hembra" />
              </Stack>
            </Checkbox.Group>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="tamaño">
          <Accordion.Control>Tamaño</Accordion.Control>
          <Accordion.Panel>
            <Checkbox.Group>
              <Stack mt="xs">
                <Checkbox value="pequeño" label="Pequeño" />
                <Checkbox value="mediano" label="Mediano" />
                <Checkbox value="grande" label="Grande" />
              </Stack>
            </Checkbox.Group>
          </Accordion.Panel>
        </Accordion.Item>

        {isLost ? (
          <Accordion.Item value="fecha de perdida">
            <Accordion.Control>Fecha de perdida</Accordion.Control>
            <Accordion.Panel>
              <DatePickerInput type="range" placeholder="Seleccione fecha" />
            </Accordion.Panel>
          </Accordion.Item>
        ) : null}

        {/*  <Accordion.Item value="ubicacion">
          <Accordion.Control disabled>Ubicacion</Accordion.Control>
          <Accordion.Panel>Content</Accordion.Panel>
        </Accordion.Item> */}
      </Accordion>
    </Stack>
  );
}

Filters.propTypes = {
  isLost: PropTypes.bool.isRequired,
};

export default Filters;
