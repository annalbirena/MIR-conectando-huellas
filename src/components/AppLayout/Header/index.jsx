/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Avatar,
  Burger,
  Button,
  Drawer,
  Group,
  Image,
  Menu,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import classes from './header.module.css';
import useAuth from '../../../hooks/useAuth';
import { useUserContext } from '../../../context/UserContext';

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
    link: '/mapa',
    label: 'Mapa',
  },
];

function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const isLoggedIn = localStorage.getItem('userId') !== null;
  const { handleLogout } = useAuth();
  const { user } = useUserContext();

  const items = links.map((link) => (
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header>
      <Drawer
        opened={opened}
        onClose={toggle}
        position="top"
        padding="md"
        title={
          <Link to="/">
            <Image height={60} src="/logo-color.svg" />
          </Link>
        }
      >
        <Stack pt="md">
          <Stack>{items}</Stack>
          <Link to="/mi-cuenta/publicar-mascota">
            <Button variant="filled" c="dark">
              ¡Registra tu mascota!
            </Button>
          </Link>
        </Stack>
      </Drawer>
      <div className={classes.header}>
        <Group>
          <Burger
            color="dark"
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
          />
          <Link to="/">
            <Image visibleFrom="sm" height={60} src="/logo-color.svg" />
            <Image hiddenFrom="sm" height={60} src="/isotipo.png" />
          </Link>
        </Group>

        <Group
          gap={5}
          justify="center"
          className={classes.links}
          visibleFrom="sm"
        >
          {items}
        </Group>

        <Group>
          {isLoggedIn ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Avatar variant="filled" color="purpleBrand.3" radius="xl">
                    {user?.name[0]}
                  </Avatar>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <Link
                    to="/mi-cuenta/datos-personales"
                    className={classes.userMenuLink}
                  >
                    Mi cuenta
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/mi-cuenta/publicar-mascota"
                    className={classes.userMenuLink}
                  >
                    Registrar mascota
                  </Link>
                </Menu.Item>
                <Menu.Item
                  color="red"
                  onClick={handleLogout}
                  leftSection={
                    <IconLogout size={16} stroke={1.5} color="red" />
                  }
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link to="/login">
              <Button
                variant="filled"
                color="purpleBrand.3"
                h={36}
                px={16}
                fz="sm"
              >
                Inicia Sesión
              </Button>
            </Link>
          )}
        </Group>
      </div>
    </header>
  );
}

export default Header;
