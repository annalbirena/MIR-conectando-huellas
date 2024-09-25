import { Burger, Button, Group, Image } from '@mantine/core';
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
            <Image height={60} src="src/assets/images/logo-color.svg" />
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

        <Button variant="filled">Inicia Sesión</Button>
      </div>
    </header>
  );
}

export default Header;
