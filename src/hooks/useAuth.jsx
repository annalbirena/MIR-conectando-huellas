import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');

    notifications.show({
      title: 'Sesión Cerrada',
      message: 'Se cerro la sesión.',
      icon: <IconCheck size={20} />,
    });

    navigate('/login');
  };
  return {
    handleLogout,
  };
};

export default useAuth;
