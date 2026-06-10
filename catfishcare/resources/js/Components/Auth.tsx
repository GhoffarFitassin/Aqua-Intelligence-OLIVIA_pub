import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Fish, Info } from 'lucide-react';

const Auth = ({ onLoginSuccess, theme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Initialize default user in localStorage if not exists
  useEffect(() => {
    const existingUsers = localStorage.getItem('aqua_users');
    if (!existingUsers) {
      const defaultUsers = [
        {
          name: 'Pak Fii',
          role: 'Kepala Budidaya (Head Aquaculturist)',
          email: 'pakfii@aqua.id',
          password: 'password123'
        }
      ];
      localStorage.setItem('aqua_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const showAlert = (message, type = 'error') => {
    setAlert({ message, type });
    const timer = setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 4000);
    return () => clearTimeout(timer);
  };

  const validateEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      showAlert('Mohon isi email dan kata sandi Anda.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Format email tidak valid.', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('aqua_users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      showAlert('Login berhasil! Mengalihkan...', 'success');
      setTimeout(() => {
        onLoginSuccess(matchedUser);
      }, 1000);
    } else {
      showAlert('Email atau kata sandi salah.', 'error');
    }
  };

  return (
    <div className="auth-container">
      {/* Visual background glows */}
      <div className="auth-bg-glow" />
      <div className="auth-bg-glow-right" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Fish size={32} />
          </div>
          <h2>OLIVIA System</h2>
          <p>Aqua-Intelligence & Harvest Failure Prevention</p>
        </div>

        {alert.message && (
          <div className={`auth-alert ${alert.type}`}>
            <Info size={16} />
            <span>{alert.message}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="auth-form-group">
            <label htmlFor="login-email">EMAIL PENGGUNA</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input
                id="login-email"
                type="email"
                className="auth-input"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="login-pwd">KATA SANDI</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input
                id="login-pwd"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            Masuk ke Dashboard
          </button>

          <div className="auth-info-badge">
            <strong>Info Akun Uji Coba:</strong><br />
            Email: <code>pakfii@aqua.id</code> | Sandi: <code>password123</code>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
