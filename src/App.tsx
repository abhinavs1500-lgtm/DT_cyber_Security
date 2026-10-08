import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import Heartbeat from './pages/Heartbeat';
import TrustNetwork from './pages/TrustNetwork';
import EmergencyCenter from './pages/EmergencyCenter';
import Simulator from './pages/Simulator';
import SecurityCenter from './pages/SecurityCenter';
import AuditLog from './pages/AuditLog';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import AlertWorkflow from './pages/AlertWorkflow';
import LegacyMap from './pages/LegacyMap';
import PrivacyArchitecture from './pages/PrivacyArchitecture';
import RecoveryDrill from './pages/RecoveryDrill';
import DigitalWill from './pages/DigitalWill';

function App() {
  const { app } = useStore();

  if (!app.isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <>
      {app.emergencyMode && <div className="emergency-overlay emergency-pulse" />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/heartbeat" element={<Heartbeat />} />
          <Route path="/trust-network" element={<TrustNetwork />} />
          <Route path="/emergency" element={<EmergencyCenter />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/security" element={<SecurityCenter />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workflow" element={<AlertWorkflow />} />
          <Route path="/legacy-map" element={<LegacyMap />} />
          <Route path="/privacy" element={<PrivacyArchitecture />} />
          <Route path="/drill" element={<RecoveryDrill />} />
          <Route path="/digital-will" element={<DigitalWill />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
