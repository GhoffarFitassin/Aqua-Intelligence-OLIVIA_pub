interface StatusBadgeProps {
    status: "success" | "warning" | "danger" | string;
    label?: string;
    variant?: "inline" | "dot" | "default";
}

const StatusBadge = ({
    status,
    label,
    variant = "default",
}: StatusBadgeProps) => {
    const normalizedStatus = status.toLowerCase();
    const displayLabel = label || normalizedStatus.toUpperCase();

    if (variant === "dot") {
        return (
            <span className={`status-dot-badge ${normalizedStatus}`}>
                {displayLabel}
            </span>
        );
    }

    if (variant === "inline") {
        return (
            <span className={`status-badge-inline ${normalizedStatus}`}>
                {displayLabel}
            </span>
        );
    }

    return (
        <span className={`status-badge ${normalizedStatus}`}>
            {displayLabel}
        </span>
    );
};

export default StatusBadge;
