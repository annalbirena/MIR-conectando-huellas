/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Avatar,
  Burger,
  Button,
  Group,
  Image,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import classes from './header.module.css';
import useAuth from '../../../hooks/useAuth';

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

function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const isLoggedIn = localStorage.getItem('userId') !== null;
  const { handleLogout } = useAuth();

  const items = links.map((link) => (
    <Link key={link.label} to={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header>
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
            <Image height={60} src="/src/assets/images/logo-color.svg" />
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
                  <Avatar variant="filled" size="md" color="brand" radius="xl">
                    MK
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
