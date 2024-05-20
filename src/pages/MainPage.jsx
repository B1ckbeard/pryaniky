import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import Header from '../components/Header';
import DisplayData from '../components/DisplayData';
import ModalWindow from '../components/modals';
import routes from '../routes';

const MainPage = () => {
  const context = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.token) {
      navigate(routes.loginPage());
    }
  }, [context.token, navigate]);

  return (
    <div style={{ height: '100%' }}>
      <Header />
      <DisplayData />
      <ModalWindow />
    </div>
  );
}

export default MainPage;
