
import { useState, useEffect } from 'react';
import { User, Shield, Sliders, Database, Save, CheckCircle, LogOut } from 'lucide-react';

const ProfileTab = ({ theme, themeSetting, onChangeThemeSetting, toggleTheme, currentUser, onLogout, onProfileUpdate }) => {
  const [farmerName, setFarmerName] = useState(currentUser?.name || 'Pak Fii');
  const [role, setRole] = useState(currentUser?.role || 'Kepala Budidaya (Head Aquaculturist)');
  const [doThreshold, setDoThreshold] = useState(2.0);
  const [ammoniaThreshold, setAmmoniaThreshold] = useState(0.0005);
  const [tempThreshold, setTempThreshold] = useState(27.0);
  const [phThreshold, setPhThreshold] = useState(6.0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFarmerName(currentUser.name);
      setRole(currentUser.role);
    }
  }, [currentUser]);

  const handleSave = (e) => {
    e.preventDefault();
    if (onProfileUpdate) {
      onProfileUpdate({
        ...currentUser,
        name: farmerName,
        role: role
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="tab-page profile-page">
      <div className="profile-header-row">
        <div>
          <h2>Profil & Pengaturan Sistem</h2>
          <p>Ubah identitas pengguna, sesuaikan nilai ambang batas sensor, dan lihat status API Laravel.</p>
        </div>
      </div>

      <div className="profile-main-grid">
        {/* Profile Settings Card */}
        <div className="card profile-settings-card">
          <div className="card-header-icon">
            <User size={20} className="icon-blue" />
            <h3>Identitas Peternak</h3>
          </div>

          <form onSubmit={handleSave} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Peran / Jabatan</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Mode Tampilan</label>
              <div style={{ display: 'flex', gap: '15px', marginTop: '8px', flexWrap: 'wrap' }}>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="themeSetting"
                    checked={themeSetting === 'dark'}
                    onChange={() => onChangeThemeSetting('dark')}
                  />
                  <span>Tema Gelap</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="themeSetting"
                    checked={themeSetting === 'light'}
                    onChange={() => onChangeThemeSetting('light')}
                  />
                  <span>Tema Terang</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="themeSetting"
                    checked={themeSetting === 'system'}
                    onChange={() => onChangeThemeSetting('system')}
                  />
                  <span>Ikuti Sistem</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '25px', alignItems: 'center' }}>
              <button type="submit" className="btn-action" style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: 0 }}>
                <Save size={14} />
                <span>Simpan Profil</span>
              </button>

              <button type="button" className="btn-logout" onClick={onLogout} style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: 0 }}>
                <LogOut size={14} />
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sensor Thresholds Sliders */}
        <div className="card profile-thresholds-card">
          <div className="card-header-icon">
            <Sliders size={20} className="icon-teal" />
            <h3>Ambang Batas Pemicu AI (Alarm Thresholds)</h3>
          </div>

          <div className="thresholds-sliders-list" style={{ marginTop: '20px' }}>
            <div className="slider-item-wrapper">
              <div className="slider-labels">
                <span className="lbl">Oksigen Terlarut (DO) Minimum</span>
                <span className="val text-danger">{doThreshold.toFixed(1)} mg/L</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={doThreshold}
                onChange={(e) => setDoThreshold(parseFloat(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="slider-item-wrapper" style={{ marginTop: '20px' }}>
              <div className="slider-labels">
                <span className="lbl">Kadar Ammonia Maksimum</span>
                <span className="val text-danger">{ammoniaThreshold.toFixed(5)}</span>
              </div>
              <input
                type="range"
                min="0.0001"
                max="0.002"
                step="0.0001"
                value={ammoniaThreshold}
                onChange={(e) => setAmmoniaThreshold(parseFloat(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="slider-item-wrapper" style={{ marginTop: '20px' }}>
              <div className="slider-labels">
                <span className="lbl">Suhu Air Pemicu Upwelling</span>
                <span className="val text-warning">{tempThreshold.toFixed(1)}°C</span>
              </div>
              <input
                type="range"
                min="25.0"
                max="28.5"
                step="0.1"
                value={tempThreshold}
                onChange={(e) => setTempThreshold(parseFloat(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="slider-item-wrapper" style={{ marginTop: '20px' }}>
              <div className="slider-labels">
                <span className="lbl">Ambang Asam Minimum (pH)</span>
                <span className="val text-warning">{phThreshold.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="7.0"
                step="0.1"
                value={phThreshold}
                onChange={(e) => setPhThreshold(parseFloat(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Status with Laravel Backend */}
      <div className="card integration-status-card" style={{ marginTop: '25px' }}>
        <div className="card-header-icon">
          <Database size={20} style={{ color: '#F59E0B' }} />
          <h3>Sinkronisasi Backend Laravel & Database</h3>
        </div>

        <div className="integration-status-row" style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <p style={{ fontSize: '13px', lineHeight: '1.5' }}>
              Frontend React terkoneksi ke backend Laravel menggunakan Inertia.js. Data sensor IoT dan biometrik dibaca langsung dari PostgreSQL database.
            </p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
              <span className="status-indicator-tag active">
                <CheckCircle size={12} />
                <span>Laravel API: Terhubung</span>
              </span>
              <span className="status-indicator-tag active">
                <CheckCircle size={12} />
                <span>Postgres DB: Terhubung</span>
              </span>
            </div>
          </div>

          <button className="sim-btn" onClick={() => alert('Mengambil data sensor terbaru dari Laravel endpoint...')}>
            Uji Koneksi API
          </button>
        </div>
      </div>

      {saved && (
        <div className="toast-success">
          <CheckCircle size={16} />
          <span>Pengaturan berhasil disimpan!</span>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
