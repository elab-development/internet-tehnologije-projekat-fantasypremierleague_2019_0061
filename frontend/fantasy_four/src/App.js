import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Switch from 'react-router-dom';
import CreateTeamPage from './components/CreateTeamPage';
import AboutPage from './components/AboutPage';
import GameDataPage from './components/GameDataPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import PlayerPage from './components/PlayerPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/create_team" element={<CreateTeamPage />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/game_data" element={<GameDataPage />}></Route>
      <Route path="/admin_dashboard" element={<AdminDashboardPage />}></Route>
      <Route path="/player/:playerId" element={<PlayerPage mode='edit' />}></Route>
      <Route path="/player" element={<PlayerPage mode='create' />}></Route>
      <Route path="/forgot_password" element={<ForgotPasswordPage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
