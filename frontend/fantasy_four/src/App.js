import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Switch from 'react-router-dom';
import CreateTeamPage from './components/CreateTeamPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/create_team" element={<CreateTeamPage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
