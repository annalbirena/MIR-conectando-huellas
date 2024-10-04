import React from 'react';
import { BackgroundImage, Center, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './cardbutton.module.css';

function CardButton({ link, text, image }) {
  return (
    <Link to={link} className={classes.card}>
      <BackgroundImage h="450" src={image} radius="lg">
        <Center p="xl" h="100%">
          <Title order={2} c="white" ta="center">
            {text}
          </Title>
        </Center>
      </BackgroundImage>
    </Link>
  );
}

CardButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardButton;
