/* eslint-disable object-curly-newline */
// eslint-disable-next-line object-curly-newline
import React from 'react';
import {
  Avatar,
  Burger,
  Group,
  Image,
  Menu,
  UnstyledButton,
  // eslint-disable-next-line object-curly-newline
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from './header.module.css';

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
              <Menu.Item color="red">Salir</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <Button variant="filled">Inicia Sesión</Button> */}
        </Group>
      </div>
    </header>
  );
}

export default Header;
