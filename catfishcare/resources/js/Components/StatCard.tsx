import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
    index?: number;
}

const StatCard = ({
    label,
    value,
    icon: Icon,
    color,
    index = 0,
}: StatCardProps) => (
    <div
        className="home-stat-card"
        style={{
            animation: "cardFadeIn 0.5s var(--transition-ease) both",
            animationDelay: `${index * 0.05}s`,
        }}
    >
        <div
            className="stat-icon-wrapper"
            style={{ backgroundColor: `${color}15`, color }}
        >
            <Icon size={24} />
        </div>
        <div className="stat-info">
            <span className="stat-label">{label}</span>
            <span className="stat-value">{value}</span>
        </div>
    </div>
);

export default StatCard;
