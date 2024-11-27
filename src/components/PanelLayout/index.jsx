import React from 'react';
import { Group, Paper } from '@mantine/core';
import PropTypes from 'prop-types';
import TableOfContents from './TableOfContents';
import classes from './panel.module.css';

function PanelLayout({ children }) {
  return (
    <Group gap="xl" align="flex-start" className={classes.container}>
      <TableOfContents />
      <Paper
        flex={1}
        shadow="xs"
        p={{
          base: 'md',
          sm: 'md',
          lg: 'xl',
        }}
        className={classes.content}
      >
        {children}
      </Paper>
    </Group>
  );
}

PanelLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PanelLayout;
