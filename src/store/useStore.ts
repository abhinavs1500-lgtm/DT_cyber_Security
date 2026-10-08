import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { VaultItem, TrustedContact, HeartbeatConfig, EmergencyEvent, AuditEntry, Notification, ThreatEvent, SecurityScore, AppState, VaultCategory, DemoStep } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);
const now = () => new Date().toISOString();

const defaultVaultItems: VaultItem[] = [
  { id: '1', name: 'Family Photos Collection', category: 'photos', size: '2.4 GB', encrypted: true, dateAdded: '2026-08-15', lastUpdated: '2026-10-06', accessLevel: 'owner' },
  { id: '2', name: 'Wedding Album 2024', category: 'photos', size: '1.8 GB', encrypted: true, dateAdded: '2024-06-20', lastUpdated: '2026-09-28', accessLevel: 'owner' },
  { id: '3', name: 'Childhood Memories', category: 'photos', size: '890 MB', encrypted: true, dateAdded: '2023-03-10', lastUpdated: '2026-10-01', accessLevel: 'owner' },
  { id: '4', name: 'Property Documents', category: 'documents', size: '45 MB', encrypted: true, dateAdded: '2025-01-15', lastUpdated: '2026-10-05', accessLevel: 'owner' },
  { id: '5', name: 'Insurance Policies', category: 'documents', size: '12 MB', encrypted: true, dateAdded: '2025-06-01', lastUpdated: '2026-09-30', accessLevel: 'owner' },
  { id: '6', name: 'Tax Records 2025', category: 'documents', size: '28 MB', encrypted: true, dateAdded: '2026-04-15', lastUpdated: '2026-10-03', accessLevel: 'owner' },
  { id: '7', name: 'Medical Records', category: 'documents', size: '15 MB', encrypted: true, dateAdded: '2025-09-20', lastUpdated: '2026-10-07', accessLevel: 'owner' },
  { id: '8', name: 'Email Recovery Codes', category: 'recovery', size: '2 KB', encrypted: true, dateAdded: '2026-01-10', lastUpdated: '2026-10-06', accessLevel: 'owner' },
  { id: '9', name: 'Cloud Storage Recovery', category: 'recovery', size: '1 KB', encrypted: true, dateAdded: '2026-02-14', lastUpdated: '2026-09-25', accessLevel: 'owner' },
  { id: '10', name: '2FA Backup Codes', category: 'recovery', size: '4 KB', encrypted: true, dateAdded: '2026-03-01', lastUpdated: '2026-10-04', accessLevel: 'owner' },
  { id: '11', name: 'Software Licenses', category: 'credentials', size: '8 KB', encrypted: true, dateAdded: '2025-11-05', lastUpdated: '2026-10-02', accessLevel: 'owner' },
  { id: '12', name: 'Subscription Accounts', category: 'credentials', size: '3 KB', encrypted: true, dateAdded: '2026-05-20', lastUpdated: '2026-10-06', accessLevel: 'owner' },
  { id: '13', name: 'Wi-Fi & Network Configs', category: 'credentials', size: '1 KB', encrypted: true, dateAdded: '2026-07-10', lastUpdated: '2026-10-05', accessLevel: 'owner' },
  { id: '14', name: 'Research Project Backup', category: 'files', size: '340 MB', encrypted: true, dateAdded: '2026-06-15', lastUpdated: '2026-10-07', accessLevel: 'owner' },
  { id: '15', name: 'Creative Portfolio', category: 'files', size: '1.2 GB', encrypted: true, dateAdded: '2025-12-01', lastUpdated: '2026-10-04', accessLevel: 'owner' },
  { id: '16', name: 'Personal Journal', category: 'files', size: '56 MB', encrypted: true, dateAdded: '2024-01-01', lastUpdated: '2026-10-08', accessLevel: 'owner' },
  { id: '17', name: 'Domain Registrations', category: 'assets', size: '5 KB', encrypted: true, dateAdded: '2025-08-20', lastUpdated: '2026-10-01', accessLevel: 'owner' },
  { id: '18', name: 'Digital Artwork NFTs', category: 'assets', size: '120 MB', encrypted: true, dateAdded: '2026-02-28', lastUpdated: '2026-09-29', accessLevel: 'owner' },
];

const defaultContacts: TrustedContact[] = [
  { id: '1', name: 'Sarah Mitchell', relationship: 'Family Member', verified: true, trustScore: 96, lastVerification: '2026-10-05', email: 's.mitchell@demo.com', approvalStatus: 'pending', available: true, avatar: 'SM' },
  { id: '2', name: 'Rahul Sharma', relationship: 'Trusted Friend', verified: true, trustScore: 91, lastVerification: '2026-10-02', email: 'r.sharma@demo.com', approvalStatus: 'pending', available: true, avatar: 'RS' },
  { id: '3', name: 'Ananya Patel', relationship: 'Family Member', verified: true, trustScore: 98, lastVerification: '2026-10-07', email: 'a.patel@demo.com', approvalStatus: 'pending', available: true, avatar: 'AP' },
];

const defaultHeartbeat: HeartbeatConfig = {
  interval: 30,
  lastCheckIn: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  nextCheckIn: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'healthy',
  consecutiveCheckins: 18,
};

const defaultSecurityScore: SecurityScore = {
  overall: 97,
  vaultSecurity: 98,
  trustNetwork: 100,
  heartbeatReliability: 95,
  recoveryReadiness: 96,
};

const defaultAuditLog: AuditEntry[] = [
  { id: '1', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), event: 'HEARTBEAT_VERIFIED', category: 'heartbeat', severity: 'info', details: 'Periodic heartbeat check-in completed' },
  { id: '2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), event: 'VAULT_INTEGRITY_CHECK', category: 'vault', severity: 'info', details: 'All vault items verified' },
  { id: '3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), event: 'VAULT_ACCESSED', category: 'vault', severity: 'info', details: 'Vault accessed by owner' },
  { id: '4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), event: 'TRUST_CONTACT_VERIFIED', category: 'trust_network', severity: 'info', details: 'Contact Ananya Patel verified identity' },
  { id: '5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), event: 'DOCUMENT_ENCRYPTED', category: 'vault', severity: 'info', details: 'New document added and encrypted' },
  { id: '6', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), event: 'LOGIN_SUCCESS', category: 'authentication', severity: 'info', details: 'Successful authentication from known device' },
  { id: '7', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), event: 'SECURITY_SCAN_COMPLETE', category: 'security', severity: 'info', details: 'Periodic security scan passed' },
];

const defaultNotifications: Notification[] = [
  { id: '1', type: 'success', title: 'Vault Encrypted', message: 'All vault items encrypted successfully', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false, icon: 'shield' },
  { id: '2', type: 'info', title: 'Heartbeat Verified', message: 'Your heartbeat check-in was recorded', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), read: false, icon: 'heart' },
  { id: '3', type: 'warning', title: 'Contact Verification', message: 'Trusted contact verification recommended', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true, icon: 'alert' },
];

const demoSteps: DemoStep[] = [
  { id: 1, title: 'View Secured Vault', description: 'Explore your encrypted digital vault', route: '/vault', completed: false },
  { id: 2, title: 'Check Heartbeat', description: 'View the inactivity heartbeat system', route: '/heartbeat', completed: false },
  { id: 3, title: 'Simulate Missed Heartbeat', description: 'Trigger emergency protocol', route: '/heartbeat', completed: false },
  { id: 4, title: 'Emergency Workflow', description: 'Watch the emergency response unfold', route: '/emergency', completed: false },
  { id: 5, title: 'Approve Contact #1', description: 'First trusted contact approval', route: '/trust-network', completed: false },
  { id: 6, title: 'Approve Contact #2', description: 'Second trusted contact approval', route: '/trust-network', completed: false },
  { id: 7, title: 'Release Authorization', description: 'View secure release status', route: '/emergency', completed: false },
  { id: 8, title: 'View Audit Log', description: 'Review the security audit trail', route: '/audit', completed: false },
];

interface Store {
  // App state
  app: AppState;
  login: (demo?: boolean) => void;
  logout: () => void;

  // Vault
  vaultItems: VaultItem[];
  addVaultItem: (item: Omit<VaultItem, 'id' | 'dateAdded' | 'lastUpdated' | 'encrypted'>) => void;
  uploadingFile: boolean;
  setUploadingFile: (v: boolean) => void;

  // Heartbeat
  heartbeat: HeartbeatConfig;
  setHeartbeatInterval: (days: number) => void;
  checkIn: () => void;
  simulateMissedHeartbeat: () => void;

  // Trusted Contacts
  contacts: TrustedContact[];
  approveContact: (id: string) => void;
  setContactAvailability: (id: string, available: boolean) => void;
  resetContacts: () => void;

  // Emergency
  emergencyEvent: EmergencyEvent | null;
  triggerEmergency: () => void;
  simulateRelease: () => void;
  cancelEmergency: () => void;
  panicLock: () => void;
  unlockPanic: () => void;

  // Audit
  auditLog: AuditEntry[];
  addAuditEntry: (entry: Omit<AuditEntry, 'id' | 'timestamp'>) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Security
  securityScore: SecurityScore;
  threats: ThreatEvent[];
  addThreat: (t: Omit<ThreatEvent, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveThreat: (id: string) => void;

  // Demo
  demoSteps: DemoStep[];
  demoActive: boolean;
  currentDemoStep: number;
  startDemo: () => void;
  advanceDemo: () => void;
  endDemo: () => void;
  completeDemoStep: (id: number) => void;

  // Drill
  drillActive: boolean;
  drillStep: number;
  drillResult: 'none' | 'pass' | 'fail';
  startDrill: () => void;
  advanceDrill: () => void;
  endDrill: () => void;

  // Reset
  resetAll: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // App
      app: {
        isAuthenticated: false,
        isDemoMode: false,
        emergencyMode: false,
        panicLock: false,
        currentUser: null,
      },
      login: (demo = false) => {
        set({
          app: {
            isAuthenticated: true,
            isDemoMode: demo,
            emergencyMode: false,
            panicLock: false,
            currentUser: {
              name: demo ? 'Alex Chen' : 'User',
              email: demo ? 'alex.chen@demo.com' : 'user@example.com',
              avatar: demo ? 'AC' : 'U',
            },
          },
        });
        get().addAuditEntry({ event: 'LOGIN_SUCCESS', category: 'authentication', severity: 'info', details: demo ? 'Demo mode activated' : 'User authenticated' });
        get().addNotification({ type: 'success', title: 'Welcome Back', message: demo ? 'Demo mode activated with sample data' : 'Successfully authenticated', icon: 'check' });
      },
      logout: () => {
        set({
          app: {
            isAuthenticated: false,
            isDemoMode: false,
            emergencyMode: false,
            panicLock: false,
            currentUser: null,
          },
          demoActive: false,
          currentDemoStep: 0,
        });
      },

      // Vault
      vaultItems: defaultVaultItems,
      addVaultItem: (item) => {
        const newItem: VaultItem = {
          ...item,
          id: generateId(),
          dateAdded: now(),
          lastUpdated: now(),
          encrypted: true,
        };
        set((s) => ({ vaultItems: [...s.vaultItems, newItem] }));
        get().addAuditEntry({ event: 'DOCUMENT_ENCRYPTED', category: 'vault', severity: 'info', details: `Item "${item.name}" encrypted and stored` });
        get().addNotification({ type: 'success', title: 'Item Secured', message: `"${item.name}" encrypted and added to vault`, icon: 'shield' });
      },
      uploadingFile: false,
      setUploadingFile: (v) => set({ uploadingFile: v }),

      // Heartbeat
      heartbeat: defaultHeartbeat,
      setHeartbeatInterval: (days) => set((s) => ({
        heartbeat: {
          ...s.heartbeat,
          interval: days,
          nextCheckIn: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
        },
      })),
      checkIn: () => {
        set((s) => ({
          heartbeat: {
            ...s.heartbeat,
            lastCheckIn: now(),
            nextCheckIn: new Date(Date.now() + s.heartbeat.interval * 24 * 60 * 60 * 1000).toISOString(),
            status: 'healthy',
            consecutiveCheckins: s.heartbeat.consecutiveCheckins + 1,
          },
          app: { ...s.app, emergencyMode: false },
          emergencyEvent: null,
        }));
        get().resetContacts();
        get().addAuditEntry({ event: 'HEARTBEAT_VERIFIED', category: 'heartbeat', severity: 'info', details: 'Manual heartbeat check-in' });
        get().addNotification({ type: 'success', title: 'Heartbeat Verified', message: 'Your heartbeat has been recorded. Emergency workflow reset.', icon: 'heart' });
      },
      simulateMissedHeartbeat: () => {
        get().triggerEmergency();
        set((s) => ({
          heartbeat: { ...s.heartbeat, status: 'missed' },
        }));
      },

      // Contacts
      contacts: defaultContacts,
      approveContact: (id) => {
        set((s) => {
          const contacts = s.contacts.map((c) =>
            c.id === id ? { ...c, approvalStatus: 'approved' as const } : c
          );
          const approvedCount = contacts.filter((c) => c.approvalStatus === 'approved').length;
          const required = s.emergencyEvent?.approvalsRequired || 2;

          let emergencyEvent = s.emergencyEvent;
          if (emergencyEvent) {
            emergencyEvent = {
              ...emergencyEvent,
              approvalsReceived: approvedCount,
              steps: emergencyEvent.steps.map((step) => {
                if (step.id === 'step4') return { ...step, status: 'completed' as const, timestamp: now() };
                if (step.id === 'step5' && approvedCount >= required) return { ...step, status: 'completed' as const, timestamp: now() };
                if (step.id === 'step5' && approvedCount > 0) return { ...step, status: 'active' as const };
                if (step.id === 'step6' && approvedCount >= required) return { ...step, status: 'active' as const };
                return step;
              }),
              status: approvedCount >= required ? 'approved' as const : emergencyEvent.status,
            };
          }

          return { contacts, emergencyEvent };
        });
        const contact = get().contacts.find((c) => c.id === id);
        get().addAuditEntry({ event: 'TRUST_CONTACT_APPROVED', category: 'trust_network', severity: 'info', details: `${contact?.name} approved emergency release` });
        get().addNotification({ type: 'info', title: 'Contact Approved', message: `${contact?.name} has approved the emergency release`, icon: 'check' });
        
        // Auto-advance demo
        const approvedCount = get().contacts.filter((c) => c.approvalStatus === 'approved').length;
        if (approvedCount === 1) get().completeDemoStep(5);
        if (approvedCount === 2) get().completeDemoStep(6);
      },
      setContactAvailability: (id, available) => {
        set((s) => ({
          contacts: s.contacts.map((c) =>
            c.id === id ? { ...c, available, approvalStatus: available ? 'pending' as const : 'unavailable' as const } : c
          ),
        }));
      },
      resetContacts: () => {
        set({ contacts: defaultContacts.map((c) => ({ ...c, approvalStatus: 'pending' as const })) });
      },

      // Emergency
      emergencyEvent: null,
      triggerEmergency: () => {
        const event: EmergencyEvent = {
          id: 'DK-20481',
          trigger: 'Missed Heartbeat',
          timestamp: now(),
          status: 'contacts_notified',
          approvalsReceived: 0,
          approvalsRequired: 2,
          securityChecks: [
            { id: '1', label: 'Heartbeat timeout verified', completed: true },
            { id: '2', label: 'Grace period completed', completed: true },
            { id: '3', label: 'User notification attempted', completed: true },
            { id: '4', label: 'Trusted contacts authenticated', completed: false },
            { id: '5', label: 'Multi-signature threshold reached', completed: false },
          ],
          steps: [
            { id: 'step1', label: 'Heartbeat Missed', status: 'completed', timestamp: now() },
            { id: 'step2', label: 'Grace Period', status: 'completed', timestamp: now() },
            { id: 'step3', label: 'User Re-Authentication', status: 'completed', timestamp: now() },
            { id: 'step4', label: 'Trusted Contact Verification', status: 'active' },
            { id: 'step5', label: 'Multi-Signature Approval', status: 'pending' },
            { id: 'step6', label: 'Vault Release', status: 'locked' },
          ],
        };
        set((s) => ({
          emergencyEvent: event,
          app: { ...s.app, emergencyMode: true },
          contacts: s.contacts.map((c) => ({ ...c, approvalStatus: 'notified' as const })),
          heartbeat: { ...s.heartbeat, status: 'missed' },
        }));
        get().addAuditEntry({ event: 'EMERGENCY_TRIGGERED', category: 'emergency', severity: 'critical', details: 'Heartbeat missed - emergency protocol initiated' });
        get().addAuditEntry({ event: 'HEARTBEAT_TIMEOUT', category: 'heartbeat', severity: 'critical', details: 'Heartbeat check-in missed' });
        get().addAuditEntry({ event: 'CONTACTS_NOTIFIED', category: 'trust_network', severity: 'warning', details: 'All trusted contacts notified' });
        get().addNotification({ type: 'error', title: 'Emergency Protocol', message: 'Inactivity detected. Emergency workflow initiated.', icon: 'alert' });
        get().completeDemoStep(3);
        get().completeDemoStep(4);
      },
      simulateRelease: () => {
        set((s) => {
          if (!s.emergencyEvent) return s;
          return {
            emergencyEvent: {
              ...s.emergencyEvent,
              status: 'released',
              steps: s.emergencyEvent.steps.map((step) => ({
                ...step,
                status: 'completed' as const,
                timestamp: step.timestamp || now(),
              })),
              securityChecks: s.emergencyEvent.securityChecks.map((c) => ({ ...c, completed: true })),
            },
          };
        });
        get().addAuditEntry({ event: 'VAULT_RELEASE_AUTHORIZED', category: 'emergency', severity: 'critical', details: 'Emergency vault release authorized - SIMULATION' });
        get().addNotification({ type: 'success', title: 'Release Authorized', message: 'Demo: Encrypted vault package prepared for authorized recipients', icon: 'unlock' });
        get().completeDemoStep(7);
      },
      cancelEmergency: () => {
        set((s) => ({
          emergencyEvent: null,
          app: { ...s.app, emergencyMode: false },
          heartbeat: { ...s.heartbeat, status: 'healthy' },
        }));
        get().resetContacts();
        get().addAuditEntry({ event: 'EMERGENCY_CANCELLED', category: 'emergency', severity: 'warning', details: 'Emergency protocol cancelled by owner' });
        get().addNotification({ type: 'info', title: 'Emergency Cancelled', message: 'Emergency protocol has been cancelled and reset', icon: 'shield' });
      },
      panicLock: () => {
        set((s) => ({
          app: { ...s.app, panicLock: true, emergencyMode: false },
          emergencyEvent: s.emergencyEvent ? { ...s.emergencyEvent, status: 'cancelled' } : null,
        }));
        get().resetContacts();
        get().addAuditEntry({ event: 'PANIC_LOCK_ACTIVATED', category: 'security', severity: 'critical', details: 'Emergency lock activated - all operations frozen' });
        get().addNotification({ type: 'error', title: 'Emergency Lock', message: 'Vault frozen. All release workflows disabled.', icon: 'lock' });
      },
      unlockPanic: () => {
        set((s) => ({
          app: { ...s.app, panicLock: false },
          emergencyEvent: null,
          heartbeat: { ...s.heartbeat, status: 'healthy' },
        }));
        get().resetContacts();
        get().addAuditEntry({ event: 'PANIC_LOCK_DEACTIVATED', category: 'security', severity: 'warning', details: 'Emergency lock deactivated' });
        get().addNotification({ type: 'success', title: 'Lock Released', message: 'Emergency lock deactivated. Normal operations resumed.', icon: 'unlock' });
      },

      // Audit
      auditLog: defaultAuditLog,
      addAuditEntry: (entry) => {
        const newEntry: AuditEntry = { ...entry, id: generateId(), timestamp: now() };
        set((s) => ({ auditLog: [newEntry, ...s.auditLog] }));
      },

      // Notifications
      notifications: defaultNotifications,
      addNotification: (n) => {
        const newN: Notification = { ...n, id: generateId(), timestamp: now(), read: false };
        set((s) => ({ notifications: [newN, ...s.notifications] }));
      },
      markNotificationRead: (id) => {
        set((s) => ({
          notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }));
      },
      clearNotifications: () => set({ notifications: [] }),

      // Security
      securityScore: defaultSecurityScore,
      threats: [],
      addThreat: (t) => {
        const newT: ThreatEvent = { ...t, id: generateId(), timestamp: now(), resolved: false };
        set((s) => ({ threats: [newT, ...s.threats] }));
        get().addAuditEntry({ event: 'THREAT_DETECTED', category: 'security', severity: t.risk === 'high' ? 'critical' : 'warning', details: t.description });
        get().addNotification({ type: t.risk === 'high' ? 'error' : 'warning', title: 'Threat Detected', message: t.description, icon: 'alert' });
      },
      resolveThreat: (id) => {
        set((s) => ({
          threats: s.threats.map((t) => (t.id === id ? { ...t, resolved: true } : t)),
        }));
      },

      // Demo
      demoSteps: demoSteps,
      demoActive: false,
      currentDemoStep: 0,
      startDemo: () => set({ demoActive: true, currentDemoStep: 0, demoSteps: demoSteps }),
      advanceDemo: () => set((s) => ({ currentDemoStep: Math.min(s.currentDemoStep + 1, s.demoSteps.length - 1) })),
      endDemo: () => set({ demoActive: false }),
      completeDemoStep: (id) => {
        set((s) => ({
          demoSteps: s.demoSteps.map((step) => (step.id === id ? { ...step, completed: true } : step)),
        }));
      },

      // Drill
      drillActive: false,
      drillStep: 0,
      drillResult: 'none',
      startDrill: () => {
        set({ drillActive: true, drillStep: 0, drillResult: 'none' });
        get().addAuditEntry({ event: 'RECOVERY_DRILL_STARTED', category: 'emergency', severity: 'info', details: 'Recovery drill initiated' });
        get().addNotification({ type: 'info', title: 'Drill Started', message: 'Recovery drill is in progress', icon: 'play' });
      },
      advanceDrill: () => {
        set((s) => {
          const next = s.drillStep + 1;
          if (next >= 7) {
            get().addAuditEntry({ event: 'RECOVERY_DRILL_COMPLETE', category: 'emergency', severity: 'info', details: 'Recovery drill completed - PASS' });
            get().addNotification({ type: 'success', title: 'Drill Complete', message: 'Recovery drill passed successfully', icon: 'check' });
            return { drillStep: next, drillResult: 'pass' as const };
          }
          return { drillStep: next };
        });
      },
      endDrill: () => set({ drillActive: false, drillStep: 0, drillResult: 'none' }),

      // Reset
      resetAll: () => {
        set({
          app: { isAuthenticated: false, isDemoMode: false, emergencyMode: false, panicLock: false, currentUser: null },
          vaultItems: defaultVaultItems,
          contacts: defaultContacts,
          heartbeat: defaultHeartbeat,
          emergencyEvent: null,
          auditLog: defaultAuditLog,
          notifications: defaultNotifications,
          securityScore: defaultSecurityScore,
          threats: [],
          demoSteps,
          demoActive: false,
          currentDemoStep: 0,
          drillActive: false,
          drillStep: 0,
          drillResult: 'none',
          uploadingFile: false,
        });
      },
    }),
    {
      name: 'dead-mans-digital-key-storage',
    }
  )
);
