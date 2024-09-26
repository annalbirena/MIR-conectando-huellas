import React from 'react';
import { Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import Footer from './Footer';
import Header from './Header';

function AppLayout({ children }) {
  return (
    <Stack mih="100vh" gap={0}>
      <Header />
      <main
        style={{
          flex: 1,
          marginTop: 48,
          marginBottom: 100,
        }}
      >
        <Stack gap={0} maw="900px" m="auto">
          {children}
        </Stack>
      </main>
      <Footer />
    </Stack>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
