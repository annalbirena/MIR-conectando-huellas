import React from 'react';
import { Divider, Group, Image, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './footer.module.css';

const links = [
  {
    link: '/perdidos',
    label: 'Perdidos',
  },
  {
    link: '/adopcion',
    label: 'Adopción',
  },
  {
    link: '/albergues',
    label: 'Albergues',
  },
];

function Footer() {
  const items = links.map((link) => (
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <footer className={classes.footer}>
      <Stack className={classes.footerContent}>
        <Group py="xl" w="100%" justify="space-between">
          <Link to="/">
            <Image height={80} src="/src/assets/images/logo-white.svg" />
          </Link>

          <Group gap={5} className={classes.links}>
            {items}
          </Group>
        </Group>
        <Divider w="100%" my="md" color="purpleBrand.2" />
        <Stack p="lg" gap={8}>
          <Text ta="center" size="sm" c="white">
            Made with by Team6
          </Text>
          <Text ta="center" size="xs" c="white">
            © 2022 Conectando Huellas. All rights reserved.
          </Text>
        </Stack>
      </Stack>
    </footer>
  );
}

export default Footer;
