import React from 'react';
import { Group, Image, Title } from '@mantine/core';
import PropTypes from 'prop-types';

function TitlePage({ text, image, imagePosition }) {
  return (
    <Group justify="center" pb={64}>
      {imagePosition === 'left' ? (
        <Image src={image} alt="title" height={70} />
      ) : null}

      <Title order={1} fw={600}>
        {text}
      </Title>

      {imagePosition === 'right' ? (
        <Image src={image} alt="title" height={70} />
      ) : null}
    </Group>
  );
}

TitlePage.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imagePosition: PropTypes.string.isRequired,
};

export default TitlePage;
