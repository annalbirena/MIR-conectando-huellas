import { Button, Group, Image, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function AccountVerifiedMessage() {
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
            ¡Cuenta Verificada!
          </h1>
          <ThemeIcon variant="light" radius="xl" size="lg" color="lime">
            <IconCheck size={24} />
          </ThemeIcon>
        </Group>
        <Text size="xl">Inicia sesión y unete a nuestra comunidad.</Text>
        <Link to="/login">
          <Button variant="filled" color="purpleBrand.3">
            Inicia Sesión
          </Button>
        </Link>
      </Stack>
      <Image height={400} src="/pet-and-dog.png" />
    </Group>
  );
}

export default AccountVerifiedMessage;
