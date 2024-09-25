import { Burger, Button, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
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
          <Image height={60} src="src/assets/images/logo-color.svg" />
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
