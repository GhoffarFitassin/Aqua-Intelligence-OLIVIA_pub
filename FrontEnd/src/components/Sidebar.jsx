import { Home, LayoutGrid, Folder, LineChart, User, Fish, Sun, Moon } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'ponds', icon: Folder, label: 'Ponds' },
    { id: 'analytics', icon: LineChart, label: 'Analytics' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img 
          src="/Gemini_Generated_Image_3d20fx3d20fx3d20.png" 
          alt="Aqua-Intelligence Logo" 
          style={{
            width: '36px',
            height: '36px',
            objectFit: 'contain',
            borderRadius: '50%',
            border: '2px solid var(--border-color)',
            padding: '2px',
            filter: theme === 'dark' ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.6))' : 'none',
            transition: 'filter 0.3s ease'
          }}
        />
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <IconComponent size={22} />
            </div>
          );
        })}
      </nav>
      
      <div 
        className="sidebar-theme-toggle" 
        onClick={toggleTheme}
        title={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
      >
        {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
      </div>

      <div className="sidebar-profile" title="Profile">
        <User size={22} onClick={() => setActiveTab('profile')} />
      </div>
    </aside>
  );
};

export default Sidebar;
