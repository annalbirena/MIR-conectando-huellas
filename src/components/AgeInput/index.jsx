import { NativeSelect, rem, TextInput } from '@mantine/core';

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

function AgeInput() {
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
    />
  );

  return (
    <TextInput
      type="number"
      placeholder="Edad"
      label="Edad"
      withAsterisk
      rightSection={select}
      rightSectionWidth={92}
    />
  );
}

export default AgeInput;
