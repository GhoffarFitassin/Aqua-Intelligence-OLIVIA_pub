interface MetricMiniCardProps {
    label: string;
    value: string;
    status: "success" | "warning" | "danger";
}

const MetricMiniCard = ({ label, value, status }: MetricMiniCardProps) => (
    <div className="metric-mini-card">
        <span className="label">{label}</span>
        <span className={`value ${status}`}>{value}</span>
    </div>
);

export default MetricMiniCard;
