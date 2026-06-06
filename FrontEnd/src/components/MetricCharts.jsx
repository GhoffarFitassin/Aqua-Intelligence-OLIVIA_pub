
import { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const MetricCharts = ({ currentMetricType, setCurrentMetricType, latestRows, theme }) => {
  const [isMetricDropdownOpen, setIsMetricDropdownOpen] = useState(false);
  
  const metricOptions = [
    { value: 'TEMPERATURE', label: 'Temperature (Suhu)' },
    { value: 'pH', label: 'pH (Keasaman)' },
    { value: 'TURBIDITY', label: 'Turbidity (Kekeruhan)' }
  ];
  
  const selectedOption = metricOptions.find(o => o.value === currentMetricType) || metricOptions[0];

  // Line chart data - use the latest rows (up to 15 entries)
  const lineChartData = latestRows.map((row) => ({
    time: row.created_at.split(' ')[1] || row.created_at,
    value: parseFloat(row[currentMetricType] || 0),
    temperature: parseFloat(row.TEMPERATURE || 0),
    turbidity: parseFloat(row.TURBIDITY || 0),
    pH: parseFloat(row.pH || 0)
  }));

  // Skema warna dinamis untuk chart
  const colors = theme === 'light' ? {
    safe: '#0070f3', // Vercel Success Blue
    warning: '#f5a623', // Amber Warning
    danger: '#ee0000', // Red Danger
    accentSoft: '#0070f3',
    accentBright: '#171717',
    tooltipBg: '#f5f5f5',
    tooltipText: '#171717',
    tooltipBorder: '#ebebeb'
  } : {
    safe: '#0070f3', // Vercel Success Blue
    warning: '#f5a623', // Amber Warning
    danger: '#ee0000', // Red Danger
    accentSoft: '#0070f3',
    accentBright: '#ffffff',
    tooltipBg: '#1a1a1a',
    tooltipText: '#ffffff',
    tooltipBorder: '#222222'
  };

  // Donut chart data - e.g. safe vs warning/danger data point distribution in history
  const safeCount = latestRows.filter(r => {
    const temp = parseFloat(r.TEMPERATURE || 0);
    const ph = parseFloat(r.pH || 0);
    const turb = parseFloat(r.TURBIDITY || 0);
    return temp >= 26.0 && temp <= 30.0 && ph >= 6.5 && ph <= 8.5 && turb <= 250;
  }).length;
  const safePercentage = Math.round((safeCount / latestRows.length) * 100) || 100;
  const warningPercentage = 100 - safePercentage;

  const pieData = [
    { name: 'Kondisi Aman', value: safePercentage, color: colors.safe },
    { name: 'Kondisi Rentan', value: warningPercentage, color: colors.warning }
  ];

  return (
    <>
      {/* Card 2: Leads (Donut Chart) */}
      <div className="card card-donut">
        <h3>Proporsi kesehatan kolam.</h3>
        <div className="donut-chart-container">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
                animationDuration={400}
                animationEasing="ease-out"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.tooltipBg, 
                  borderColor: colors.tooltipBorder,
                  color: colors.tooltipText,
                  fontSize: '11px',
                  borderRadius: '6px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'var(--font-title)', color: colors.safe }}>
              {safePercentage}%
            </span>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Status Kolam Aman di Siklus Ini
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: Line Chart */}
      <div className="card card-line" style={{ gridColumn: 'span 4' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Tren parameter sensor.</h3>
          <div className="custom-dropdown-container">
            <button 
              className="custom-dropdown-trigger" 
              onClick={() => setIsMetricDropdownOpen(!isMetricDropdownOpen)}
              style={{ minWidth: '160px' }}
            >
              <span>{selectedOption.label}</span>
              <ChevronDown size={14} className={`chevron-icon ${isMetricDropdownOpen ? 'open' : ''}`} />
            </button>
            {isMetricDropdownOpen && (
              <div className="custom-dropdown-menu">
                {metricOptions.map((opt) => (
                  <div 
                    key={opt.value} 
                    className={`custom-dropdown-item ${currentMetricType === opt.value ? 'selected' : ''}`}
                    onClick={() => {
                      setCurrentMetricType(opt.value);
                      setIsMetricDropdownOpen(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="line-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineChartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.accentSoft} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={colors.accentSoft} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                stroke="var(--color-text-muted)" 
                fontSize={9} 
                tickLine={false}
              />
              <YAxis 
                stroke="var(--color-text-muted)" 
                fontSize={9} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: colors.tooltipBg, 
                  borderColor: colors.tooltipBorder,
                  color: colors.tooltipText,
                  fontSize: '11px',
                  borderRadius: '6px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={colors.accentSoft} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorVal)" 
                dot={{ stroke: colors.accentSoft, strokeWidth: 1, r: 2 }}
                activeDot={{ r: 4, stroke: colors.accentBright, strokeWidth: 2 }}
                animationDuration={400}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default MetricCharts;
