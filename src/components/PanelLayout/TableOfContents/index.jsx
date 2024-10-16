import { Link, useLocation } from 'react-router-dom';
import { Box, Paper } from '@mantine/core';
import { IconDog, IconLogout, IconUserEdit } from '@tabler/icons-react';
import classes from './content.module.css';

function TableOfContents() {
  const { pathname } = useLocation();
  const active = pathname.split('/').pop();

  return (
    <Paper miw={250} shadow="xs">
      <Link
        to="/mi-cuenta/datos-personales"
        className={`${classes.link} ${active === 'datos-personales' ? classes.linkActive : ''}`}
        style={{
          paddingLeft: `calc(${1} * var(--mantine-spacing-md))`,
        }}
      >
        <IconUserEdit size={18} stroke={1.5} />
        Datos Personales
      </Link>
      <Link
        to="/mi-cuenta/publicar-mascota"
        className={`${classes.link} ${active === 'publicar-mascota' ? classes.linkActive : ''}`}
        style={{
          paddingLeft: `calc(${1} * var(--mantine-spacing-md))`,
        }}
      >
        <IconUserEdit size={18} stroke={1.5} />
        Publicar Mascota
      </Link>
      <Box
        className={classes.link}
        style={{
          paddingLeft: `calc(${1} * var(--mantine-spacing-md))`,
        }}
      >
        Mis Mascotas
      </Box>
      <Link
        to="/mi-cuenta/mascotas-perdidas"
        className={`${classes.link} ${active === 'mascotas-perdidas' ? classes.linkActive : ''}`}
        style={{
          paddingLeft: `calc(${2} * var(--mantine-spacing-md))`,
        }}
      >
        <IconDog size={18} stroke={1.5} />
        Perdidos
      </Link>
      <Link
        to="/mi-cuenta/mascotas-adopcion"
        className={`${classes.link} ${active === 'mascotas-adopcion' ? classes.linkActive : ''}`}
        style={{
          paddingLeft: `calc(${2} * var(--mantine-spacing-md))`,
        }}
      >
        <IconDog size={18} stroke={1.5} />
        En Adopción
      </Link>
      <Box
        className={classes.link}
        style={{
          paddingLeft: `calc(${1} * var(--mantine-spacing-md))`,
        }}
      >
        <IconLogout size={18} stroke={1.5} />
        Cerrar Sesión
      </Box>
    </Paper>
  );
}

export default TableOfContents;
