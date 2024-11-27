/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mantine/core';
import AppLayout from '../../components/AppLayout';
import { verifyAccount } from '../../services/user';
import LoadingAccountVerifiedMessage from '../../components/AlertMessages/LoadingAccountVerifiedMessage';
import AccountVerifiedMessage from '../../components/AlertMessages/AccountVerifiedMessage';
import AccountNotVerifiedMessage from '../../components/AlertMessages/AccountNotVerifiedMessage';

function VerifyAccountPage() {
  const { token } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyExecuted, setVerifyExecuted] = useState(false);

  useEffect(() => {
    const verify = async () => {
      setIsLoading(true);
      setVerifyExecuted(true);

      const response = await verifyAccount(token);
      if (response) {
        setIsLoading(false);
        setUser(response);
      }
      setIsLoading(false);
    };

    if (!user && token) {
      verify();
    }
  }, []);

  const message =
    verifyExecuted && user ? (
      <AccountVerifiedMessage />
    ) : verifyExecuted && !user ? (
      <AccountNotVerifiedMessage />
    ) : (
      <Box>{null}</Box>
    );

  return (
    <AppLayout>
      {isLoading ? <LoadingAccountVerifiedMessage /> : message}
    </AppLayout>
  );
}

export default VerifyAccountPage;
