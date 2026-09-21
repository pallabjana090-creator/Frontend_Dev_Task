import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * JwtInspectorModal Component
 * Interactive diagnostic modal visualizing the simulated JWT token in LocalStorage
 */
const JwtInspectorModal = ({ isOpen, onClose }) => {
  const { token, getDecodedToken } = useAuth();

  if (!isOpen) return null;

  const decoded = getDecodedToken();

  return (
    <div className="jwt-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="jwt-modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔑</span> Simulated JWT Token Inspector
          </h2>
          <button
            type="button"
            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '1.4rem', cursor: 'pointer' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          This token was simulated and stored in <code style={{ color: 'var(--accent-cyan)' }}>localStorage.getItem('taskflow_jwt_token')</code> following the standard 3-part base64url specification.
        </p>

        {decoded ? (
          <>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: '#f43f5e', letterSpacing: '0.5px' }}>
                1. Header (Algorithm &amp; Token Type)
              </span>
              <pre className="jwt-block header">{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: '#a855f7', letterSpacing: '0.5px' }}>
                2. Payload (Data Claims &amp; Expiry)
              </span>
              <pre className="jwt-block payload">{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: '#06b6d4', letterSpacing: '0.5px' }}>
                3. Signature Hash (HMAC-SHA256 Simulation)
              </span>
              <pre className="jwt-block sig">{decoded.signature}</pre>
            </div>

            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.5px' }}>
                Raw Serialized Token
              </span>
              <pre className="jwt-block" style={{ color: 'var(--text-main)', fontSize: '0.75rem' }}>{token}</pre>
            </div>
          </>
        ) : (
          <p style={{ color: 'var(--accent-rose)' }}>No active JWT token found in localStorage.</p>
        )}

        <button
          type="button"
          className="btn-form-submit"
          style={{ width: '100%', marginTop: '6px' }}
          onClick={onClose}
        >
          Close Inspector
        </button>
      </div>
    </div>
  );
};

export default JwtInspectorModal;

