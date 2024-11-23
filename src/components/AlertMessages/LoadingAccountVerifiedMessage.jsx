import { Group, Image, Loader, Stack, Text } from '@mantine/core';

function LoadingAccountVerifiedMessage() {
  return (
    <Group justify="space-between">
      <Stack w={400}>
        <Group>
          <h1
            style={{
              flex: 1,
              marginTop: 0,
              marginBottom: 0,
              lineHeight: '44px',
            }}
          >
            Verificando Cuenta
          </h1>
          <Loader color="purpleBrand" type="dots" />
        </Group>
        <Text size="xl">
          Espera unos momentos, estamos verificando tu cuenta.
        </Text>
      </Stack>
      <Image height={400} src="/pet-and-dog.png" />
    </Group>
  );
}

export default LoadingAccountVerifiedMessage;
