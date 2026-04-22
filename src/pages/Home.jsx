import { useNavigate } from 'react-router-dom';
import {
  Building2,
  User,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Users,
  ArrowRight,
  Database,
  Globe,
  Zap
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, #ffffff, #f8fafc)',
      fontFamily: 'Inter, sans-serif',
      color: '#0f172a'
    },

    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 20px'
    },

    logoWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 700
    },

    logoIcon: {
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      color: '#fff',
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    badge: {
      border: '1px solid #e2e8f0',
      padding: '5px 12px',
      borderRadius: '999px',
      fontSize: '11px',
      color: '#64748b'
    },

    main: {
      flex: 1,
      padding: '90px 24px 40px',
      textAlign: 'center'
    },

    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
      gap: '40px',
      maxWidth: '1000px',
      margin: '0 auto'
    },

    card: {
      cursor: 'pointer',
      borderRadius: '20px',
      padding: '36px',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      textAlign: 'center',
      transition: 'all 0.25s ease',
      boxShadow: '0 8px 40px rgba(0,0,0,0.05)'
    },

    iconBox: (bg, color) => ({
      background: bg,
      color: color,
      width: '54px',
      height: '54px',
      borderRadius: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px auto' // 👈 centers icon
    }),

    footer: {
      marginTop: '80px',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '40px'
    },

    featureRow: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '30px',
      overflowX: 'auto'
    },

    featureItem: {
      minWidth: '170px',
      textAlign: 'center' // 👈 center everything
    },

    featureIcon: {
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'center'
    }
  };

  const hover = (e) => {
    e.currentTarget.style.transform = 'translateY(-8px)';
    e.currentTarget.style.boxShadow = '0 18px 50px rgba(0,0,0,0.1)';
  };

  const leave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.05)';
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <Building2 size={18} />
          </div>
          Agnayi Infra Resources CRM
        </div>
        <div style={styles.badge}>Prototype</div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        <h1 style={{ fontSize: '44px', fontWeight: 800 }}>
          Modern property management,<br />
          <span style={{ color: '#94a3b8' }}>We find home.</span>
        </h1>

        <p style={{ color: '#64748b', marginBottom: '50px' }}>
          Connect buyers with their dream homes and empower agents with data-driven insights.
        </p>

        {/* CARDS */}
        <div style={styles.grid}>
          <div
            style={styles.card}
            onMouseEnter={hover}
            onMouseLeave={leave}
            onClick={() => navigate('/client')}
          >
            <div style={styles.iconBox('#ecfdf5', '#10b981')}>
              <User size={24} />
            </div>
            <h2>Client Portal</h2>
            <p style={{ color: '#64748b', marginTop: '10px' }}>
              Find or sell your property with expert guidance.
            </p>
            <div style={{ marginTop: '24px', fontWeight: 600 }}>
              Enter Portal <ArrowRight size={16} />
            </div>
          </div>

          <div
            style={styles.card}
            onMouseEnter={hover}
            onMouseLeave={leave}
            onClick={() => navigate('/user')}
          >
            <div style={styles.iconBox('#eef2ff', '#6366f1')}>
              <Briefcase size={24} />
            </div>
            <h2>Agent & Admin</h2>
            <p style={{ color: '#64748b', marginTop: '10px' }}>
              Manage listings, clients, and analytics securely.
            </p>
            <div style={{ marginTop: '24px', fontWeight: 600, color: '#6366f1' }}>
              Sign In <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div style={styles.footer}>
          <div style={styles.featureRow}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><ShieldCheck size={18} /></div>
              <strong>Secure Platform</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                End-to-end encryption & compliance.
              </p>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><TrendingUp size={18} /></div>
              <strong>Market Insights</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Real-time pricing intelligence.
              </p>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Users size={18} /></div>
              <strong>Smart Routing</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Match clients to best agents.
              </p>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Database size={18} /></div>
              <strong>Centralized Data</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Unified listings & CRM.
              </p>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Globe size={18} /></div>
              <strong>Global Reach</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Reach international buyers.
              </p>
            </div>

            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Zap size={18} /></div>
              <strong>Automation</strong>
              <p style={{ fontSize: '12px', color: '#64748b' }}>
                Smart workflows & alerts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}