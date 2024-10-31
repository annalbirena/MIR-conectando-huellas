/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Accordion, Button, Checkbox, Stack, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import PropTypes from 'prop-types';
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
  IconX,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { useUserContext } from '../../context/UserContext';
import {
  getAdoptPetsByFilters,
  getLostPetsByFilters,
} from '../../services/pets';
import buildFilterURL from '../../utils/buildFilterUrl';
import 'dayjs/locale/es';

function Filters({
  setPetsData,
  loadingFilterPets,
  setLoadingFilterPets,
  isLost,
}) {
  const [items, setItems] = useState([]);
  const { species } = useUserContext();

  const form = useForm({
    initialValues: {
      specie: '',
      sex: '',
      size: '',
      lostDateRange: [null, null],
    },
  });

  const handleSubmit = async (values) => {
    setLoadingFilterPets(true);
    const filters = buildFilterURL(values);

    try {
      // Ejecutar la funcion correspondiente a perdidos o adopcion
      const data = isLost
        ? await getLostPetsByFilters(filters)
        : await getAdoptPetsByFilters(filters);

      if (data) {
        setLoadingFilterPets(false);
        setPetsData(data);
      }

      setLoadingFilterPets(false);
    } catch (error) {
      setLoadingFilterPets(false);
      console.log(error);
      notifications.show({
        title: 'Error!',
        message: 'No se pudo aplicar el filtro, intenta nuevamente.',
        icon: <IconX size={20} />,
      });
    }
  };

  return (
    <Stack>
      <Title order={4}>Filtrar por</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Accordion w={200} multiple value={items} onChange={setItems}>
            <Accordion.Item value="especie">
              <Accordion.Control>Especie</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group
                  key={form.key('specie')}
                  {...form.getInputProps('specie')}
                >
                  <Stack mt="xs">
                    {species?.map((specie) => (
                      <Checkbox
                        key={specie.value}
                        value={specie.value}
                        label={specie.label}
                      />
                    ))}
                  </Stack>
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="sexo">
              <Accordion.Control>Sexo</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group
                  key={form.key('sex')}
                  {...form.getInputProps('sex')}
                >
                  <Stack mt="xs">
                    <Checkbox value="female" label="Hembra" />
                    <Checkbox value="male" label="Macho" />
                  </Stack>
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="tamaño">
              <Accordion.Control>Tamaño</Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group
                  key={form.key('size')}
                  {...form.getInputProps('size')}
                >
                  <Stack mt="xs">
                    <Checkbox value="small" label="Pequeño" />
                    <Checkbox value="medium" label="Mediano" />
                    <Checkbox value="large" label="Grande" />
                  </Stack>
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>

            {isLost ? (
              <Accordion.Item value="fecha de perdida">
                <Accordion.Control>Fecha de perdida</Accordion.Control>
                <Accordion.Panel>
                  <DatePickerInput
                    type="range"
                    clearable
                    locale="es"
                    placeholder="Seleccione rango de fecha"
                    previousIcon={<IconChevronLeft size={18} />}
                    nextIcon={<IconChevronRight size={18} />}
                    key={form.key('lostDateRange')}
                    {...form.getInputProps('lostDateRange')}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            ) : null}

            {/*  <Accordion.Item value="ubicacion">
          <Accordion.Control disabled>Ubicacion</Accordion.Control>
          <Accordion.Panel>Content</Accordion.Panel>
        </Accordion.Item> */}
          </Accordion>
          <Button
            type="submit"
            loading={loadingFilterPets}
            rightSection={<IconFilter size={14} />}
          >
            Filtrar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

Filters.propTypes = {
  setPetsData: PropTypes.func.isRequired,
  loadingFilterPets: PropTypes.bool.isRequired,
  setLoadingFilterPets: PropTypes.func.isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default Filters;
