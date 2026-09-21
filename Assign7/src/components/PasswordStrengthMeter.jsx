import React from 'react';

/**
 * PasswordStrengthMeter Component
 * Evaluates password entropy dynamically:
 * - 4 tiers: Weak, Fair, Good, Strong
 * - Checks length, mixed case, numbers, special characters
 */
export const calculatePasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: 'None',
      className: '',
      checks: {
        length: false,
        mixedCase: false,
        numbers: false,
        symbols: false
      }
    };
  }

  const checks = {
    length: password.length >= 8,
    mixedCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password)
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  if (passedCount <= 1 || password.length < 6) {
    return { score: 1, label: 'Weak', className: 'weak', checks };
  }
  if (passedCount === 2) {
    return { score: 2, label: 'Fair', className: 'fair', checks };
  }
  if (passedCount === 3) {
    return { score: 3, label: 'Good', className: 'good', checks };
  }
  return { score: 4, label: 'Strong', className: 'strong', checks };
};

const PasswordStrengthMeter = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  if (!password) return null;

  return (
    <div className="strength-meter-container">
      <div className="strength-header">
        <span className="strength-label">Password Strength:</span>
        <span className={`strength-text ${strength.className}`}>{strength.label}</span>
      </div>

      <div className="strength-track">
        <div className={`strength-bar ${strength.className}`}></div>
      </div>

      <div className="strength-checklist">
        <span className={`checklist-item ${strength.checks.length ? 'valid' : ''}`}>
          {strength.checks.length ? '✓' : '○'} 8+ chars
        </span>
        <span className={`checklist-item ${strength.checks.mixedCase ? 'valid' : ''}`}>
          {strength.checks.mixedCase ? '✓' : '○'} Upper &amp; Lower
        </span>
        <span className={`checklist-item ${strength.checks.numbers ? 'valid' : ''}`}>
          {strength.checks.numbers ? '✓' : '○'} Numbers
        </span>
        <span className={`checklist-item ${strength.checks.symbols ? 'valid' : ''}`}>
          {strength.checks.symbols ? '✓' : '○'} Symbols
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;

