import { Fish, Thermometer, ShieldAlert, CloudRain, Calendar, Plus, FileText, ClipboardList } from 'lucide-react';

const HomeTab = ({ rawData, currentData, setActiveTab, selectedPondId, setSelectedPondId }) => {
  const isPondCritical = currentData?.pH < 6.0 || currentData?.pH > 9.0 || currentData?.TURBIDITY > 300;
  const isPondWarning = currentData?.TEMPERATURE < 26.0 || currentData?.TEMPERATURE > 31.0 || (currentData?.pH >= 6.0 && currentData?.pH < 6.5) || currentData?.TURBIDITY > 250;

  // Dynamic farm stats overview
  const farmStats = [
    { label: 'Total Kolam', value: '12 Kolam', icon: Fish, color: '#38BDF8' },
    { label: 'Total Populasi', value: '120.000 Ekor', icon: Fish, color: '#14B8A6' },
    { 
      label: 'Status Kritis', 
      value: isPondCritical ? `1 Kolam (Kolam ${selectedPondId})` : '0 Kolam Kritis', 
      icon: ShieldAlert, 
      color: isPondCritical ? '#EF4444' : '#14B8A6' 
    },
    { label: `Suhu Kolam ${selectedPondId}`, value: `${currentData?.TEMPERATURE.toFixed(1) || '28.5'}°C`, icon: Thermometer, color: '#F59E0B' }
  ];

  const quickActions = [
    { label: 'Catat Pemberian Pakan', icon: ClipboardList, action: () => alert('Fitur mencatat pakan terintegrasi dengan Laravel backend.') },
    { label: 'Lihat Detail Monitoring', icon: FileText, action: () => setActiveTab('dashboard') },
    { label: 'Kelola Seluruh Kolam', icon: Plus, action: () => setActiveTab('ponds') }
  ];

  // List of active ponds to display in home overview
  const activePondsList = [
    { id: 12, name: 'Kolam 12', type: 'Bioflok Bulat D3', population: '10.000 Ekor', defaultTemp: 28.2, defaultPh: 7.1, defaultTurbidity: 100 },
    { id: 11, name: 'Kolam 11', type: 'Tanah Tradisional', population: '15.000 Ekor', defaultTemp: 28.5, defaultPh: 7.2, defaultTurbidity: 120 },
    { id: 10, name: 'Kolam 10', type: 'Terpal Kotak', population: '8.000 Ekor', defaultTemp: 29.0, defaultPh: 7.4, defaultTurbidity: 80 },
    { id: 9, name: 'Kolam 09', type: 'Bioflok Bulat D3', population: '10.000 Ekor', defaultTemp: 26.9, defaultPh: 6.4, defaultTurbidity: 150 }
  ];

  return (
    <div className="tab-page home-page">
      <div className="welcome-banner-home">
        <div className="welcome-text">
          <h2>Selamat Datang Kembali, Pak Fii! 👋</h2>
          {isPondCritical ? (
            <p>Kondisi pertanian Anda stabil, namun <strong>Kolam {selectedPondId}</strong> memerlukan tindakan segera terkait kadar oksigen terlarut/amonia!</p>
          ) : isPondWarning ? (
            <p><strong>Kolam {selectedPondId}</strong> terpantau dalam status <strong>WASPADA</strong>. Silakan periksa sirkulasi air.</p>
          ) : (
            <p>Kondisi pemantauan Kolam {selectedPondId} saat ini dalam keadaan <strong>AMAN & OPTIMAL</strong>. Pertumbuhan lele sangat stabil.</p>
          )}
        </div>
        <div className="current-date-badge">
          <Calendar size={16} />
          <span>Kamis, 21 Mei 2026</span>
        </div>
      </div>

      <div className="home-stats-grid">
        {farmStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="home-stat-card"
              style={{ 
                animation: 'cardFadeIn 0.5s var(--transition-ease) both', 
                animationDelay: `${index * 0.05}s` 
              }}
            >
              <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="home-main-grid">
        <div 
          className="card weather-advisory-card"
          style={{ 
            animation: 'cardFadeIn 0.5s var(--transition-ease) both', 
            animationDelay: '0.2s' 
          }}
        >
          <div className="card-header-advisory">
            <CloudRain size={28} className="weather-icon" />
            <div>
              <h3>Rekomendasi Cuaca & Pakan AI</h3>
              <p>Prakiraan: Hujan Sedang Sore Hari</p>
            </div>
          </div>
          <div className="advisory-content">
            <p>
              <strong>Instruksi AI:</strong> Suhu air diperkirakan akan turun sebesar 1.5°C sore ini akibat hujan. 
              Guna menghindari stres pencernaan ikan lele dan penumpukan sisa pakan (amonia):
            </p>
            <ul>
              <li>Kurangi dosis pemberian pakan sore sebesar <strong>20%</strong> pada kolam aktif.</li>
              <li>Jangan berikan pakan jika hujan deras sedang berlangsung.</li>
              <li>Pantau terus parameter pH setelah hujan reda (potensi drop akibat asam air hujan).</li>
            </ul>
          </div>
        </div>

        <div 
          className="card quick-actions-card"
          style={{ 
            animation: 'cardFadeIn 0.5s var(--transition-ease) both', 
            animationDelay: '0.25s' 
          }}
        >
          <h3>Pintasan Cepat</h3>
          <div className="actions-list">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button 
                  key={index} 
                  className="action-row-btn" 
                  onClick={action.action}
                  style={{
                    animation: 'todoFadeIn 0.4s var(--transition-ease) both',
                    animationDelay: `${0.3 + index * 0.05}s`
                  }}
                >
                  <div className="action-btn-left">
                    <Icon size={18} />
                    <span>{action.label}</span>
                  </div>
                  <span className="arrow">→</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Ponds Overview */}
      <div 
        className="card active-ponds-overview-card"
        style={{ 
          animation: 'cardFadeIn 0.5s var(--transition-ease) both', 
          animationDelay: '0.35s' 
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Ringkasan Status Kolam Aktif</h3>
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>*Klik baris kolam untuk memantau langsung</span>
        </div>
        <div className="table-responsive">
          <table className="home-ponds-table">
            <thead>
              <tr>
                <th>Nama Kolam</th>
                <th>Tipe Kolam</th>
                <th>Kepadatan</th>
                <th>Suhu Air</th>
                <th>pH</th>
                <th>Kekeruhan</th>
                <th>Status AI</th>
              </tr>
            </thead>
            <tbody>
              {activePondsList.map((pond) => {
                const isSelected = pond.id === selectedPondId;
                const temp = isSelected && currentData ? currentData.TEMPERATURE : pond.defaultTemp;
                const ph = isSelected && currentData ? currentData.pH : pond.defaultPh;
                const turbidity = isSelected && currentData ? currentData.TURBIDITY : pond.defaultTurbidity;
                
                const isCritical = ph < 6.0 || ph > 9.0 || turbidity > 300;
                const isWarning = temp < 26.0 || temp > 31.0 || (ph >= 6.0 && ph < 6.5) || turbidity > 250;
                const statusStr = isCritical ? 'BAHAYA' : isWarning ? 'WASPADA' : 'AMAN';
                const badgeClass = isCritical ? 'danger' : isWarning ? 'warning' : 'success';

                return (
                  <tr 
                    key={`${selectedPondId}-${pond.id}`} 
                    onClick={() => {
                      setSelectedPondId(pond.id);
                      setActiveTab('dashboard');
                    }}
                    style={{ cursor: 'pointer' }}
                    className={isSelected ? 'active-pond-row' : ''}
                  >
                    <td>
                      <strong>{pond.name}</strong> 
                      {isSelected && <span className="active-tag-inline">IoT Terkoneksi</span>}
                    </td>
                    <td>{pond.type}</td>
                    <td>{pond.population}</td>
                    <td>{temp.toFixed(1)}°C</td>
                    <td>{ph.toFixed(1)}</td>
                    <td className={isCritical ? 'text-danger font-bold' : badgeClass === 'warning' ? 'text-warning' : 'text-success'}>
                      {turbidity.toFixed(0)} NTU
                    </td>
                    <td>
                      <span className={`status-badge-inline ${badgeClass}`}>
                        {statusStr}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
