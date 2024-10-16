/* eslint-disable react/require-default-props */
import React from 'react';
import { Box, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

function AppLayout({ children, bgColor = 'white', maw = 980 }) {
  return (
    <Stack mih="100vh" gap={0}>
      <Header />
      <main
        style={{
          flex: 1,
          padding: '48px 16px 100px 16px',
          backgroundColor: bgColor,
        }}
      >
        <Box maw={maw} m="auto">
          {children}
        </Box>
      </main>
      <Footer />
    </Stack>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  bgColor: PropTypes.string,
  maw: PropTypes.number,
};

export default AppLayout;
