import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import routes from './routes';

const App = () => (
  <Router>
    <Routes>
      <Route path={routes.loginPage()} element={<LoginPage />} />
      <Route path={routes.mainPage()} element={<MainPage />} />
    </Routes>
  </Router>
);

export default App;
