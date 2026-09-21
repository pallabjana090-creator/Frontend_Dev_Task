/**
 * JWT Token Simulation Utilities
 * Generates and validates standard 3-part base64 encoded JWT tokens:
 * Header . Payload . Signature
 */

// Helper to base64 encode UTF-8 strings safely
const base64UrlEncode = (str) => {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Helper to base64 decode UTF-8 strings safely
const base64UrlDecode = (str) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }
  return decodeURIComponent(escape(atob(output)));
};

/**
 * Generate a simulated JWT token
 * @param {Object} payloadData - User claims and session data
 * @param {number} expiresInHours - Token lifetime
 * @returns {string} Simulated JWT token string
 */
export const generateSimulatedJWT = (payloadData, expiresInHours = 24) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...payloadData,
    iat: now,
    exp: now + expiresInHours * 3600,
    iss: 'taskflow-auth-authority'
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  // Simulated HMAC-SHA256 signature representation
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const mockSignature = base64UrlEncode(`sig_hash_${now}_${Math.random().toString(36).substring(2, 10)}`);

  return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
};

/**
 * Decode and inspect a simulated JWT token
 * @param {string} token - JWT token string
 * @returns {Object|null} Decoded header, payload, and signature
 */
export const decodeSimulatedJWT = (token) => {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? now > payload.exp : false;

    return {
      header,
      payload,
      signature,
      isExpired,
      raw: token
    };
  } catch (err) {
    console.error('Error decoding simulated JWT:', err);
    return null;
  }
};

/**
 * Validate token validity and expiration
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenValid = (token) => {
  const decoded = decodeSimulatedJWT(token);
  return decoded !== null && !decoded.isExpired;
};

