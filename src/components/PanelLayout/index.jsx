import React from 'react';
import { Group, Paper } from '@mantine/core';
import PropTypes from 'prop-types';
import TableOfContents from './TableOfContents';

function PanelLayout({ children }) {
  return (
    <Group gap="xl" align="flex-start">
      <TableOfContents />
      <Paper flex={1} shadow="xs" p="xl">
        {children}
      </Paper>
    </Group>
  );
}

PanelLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PanelLayout;
