export interface VaultItem {
  id: string;
  name: string;
  category: VaultCategory;
  size: string;
  encrypted: boolean;
  dateAdded: string;
  lastUpdated: string;
  accessLevel: 'owner' | 'trusted' | 'emergency';
}

export type VaultCategory = 'photos' | 'documents' | 'credentials' | 'recovery' | 'files' | 'assets';

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  verified: boolean;
  trustScore: number;
  lastVerification: string;
  email: string;
  approvalStatus: 'pending' | 'approved' | 'notified' | 'unavailable';
  available: boolean;
  avatar: string;
}

export interface HeartbeatConfig {
  interval: number; // days
  lastCheckIn: string;
  nextCheckIn: string;
  status: 'healthy' | 'warning' | 'missed' | 'critical';
  consecutiveCheckins: number;
}

export interface EmergencyEvent {
  id: string;
  trigger: string;
  timestamp: string;
  status: 'initiated' | 'grace_period' | 'contacts_notified' | 'awaiting_approval' | 'approved' | 'released' | 'cancelled' | 'blocked';
  approvalsReceived: number;
  approvalsRequired: number;
  securityChecks: SecurityCheck[];
  steps: EmergencyStep[];
}

export interface SecurityCheck {
  id: string;
  label: string;
  completed: boolean;
}

export interface EmergencyStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending' | 'locked';
  timestamp?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  event: string;
  category: 'authentication' | 'vault' | 'heartbeat' | 'emergency' | 'trust_network' | 'security';
  severity: 'info' | 'warning' | 'critical';
  details?: string;
}

export interface ThreatEvent {
  id: string;
  type: string;
  risk: 'low' | 'medium' | 'high';
  description: string;
  timestamp: string;
  resolved: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: string;
}

export interface AppState {
  isAuthenticated: boolean;
  isDemoMode: boolean;
  emergencyMode: boolean;
  panicLock: boolean;
  currentUser: {
    name: string;
    email: string;
    avatar: string;
  } | null;
}

export interface SecurityScore {
  overall: number;
  vaultSecurity: number;
  trustNetwork: number;
  heartbeatReliability: number;
  recoveryReadiness: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: ScenarioStep[];
}

export interface ScenarioStep {
  label: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
}

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  route: string;
  completed: boolean;
}

export interface AlertWorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'wait' | 'notify' | 'approval' | 'release';
  label: string;
  config: Record<string, any>;
  editable: boolean;
}

export interface WillStep {
  id: number;
  title: string;
  completed: boolean;
}
