/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { NativeSelect, rem, TextInput } from '@mantine/core';
import PropTypes from 'prop-types';

const data = [
  {
    value: 'year',
    label: 'Años',
  },
  {
    value: 'month',
    label: 'Meses',
  },
];

function AgeInput({ form }) {
  const select = (
    <NativeSelect
      data={data}
      rightSectionWidth={28}
      styles={{
        input: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: rem(92),
          marginRight: rem(-2),
        },
      }}
      key={form.key('pet.age.type')}
      {...form.getInputProps('pet.age.type')}
    />
  );

  return (
    <TextInput
      withAsterisk
      type="number"
      label="Edad"
      placeholder="Edad"
      rightSection={select}
      rightSectionWidth={92}
      key={form.key('pet.age.number')}
      {...form.getInputProps('pet.age.number')}
    />
  );
}

AgeInput.propTypes = {
  form: PropTypes.shape({
    getInputProps: PropTypes.func.isRequired,
    key: PropTypes.func.isRequired,
  }).isRequired,
};

export default AgeInput;
