/* eslint-disable object-curly-newline */
import { Anchor, Group, Image, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

function AccountNotVerifiedMessage() {
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
            Ups! No se pudo verificar tu cuenta
          </h1>
          <ThemeIcon variant="light" radius="xl" size="lg" color="red">
            <IconX size={24} />
          </ThemeIcon>
        </Group>
        <Text size="xl">
          Intenta nuevamente en unos minutos accediendo al link que llego a tu
          correo o{' '}
          <Anchor href="#" underline="always" c="purpleBrand">
            contáctanos
          </Anchor>
          .
        </Text>
      </Stack>
      <Image height={400} src="/src/assets/images/cat-crying.png" />
    </Group>
  );
}

export default AccountNotVerifiedMessage;
