import { CheckCircle, FileText, XCircle, Zap } from "lucide-react";

type StatItem = {
  label: string;
  value: number;
  icon: typeof FileText;
  bgColor: string;
  iconColor: string;
  borderColor: string;
};

const STAT_CONFIGS: Record<string, Omit<StatItem, "value">> = {
  total: {
    label: "Tổng số file",
    icon: FileText,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  processing: {
    label: "Đang xử lý",
    icon: Zap,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  completed: {
    label: "Hoàn thành",
    icon: CheckCircle,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
  exactMatch: {
    label: "Khớp hoàn hảo",
    icon: CheckCircle,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  errors: {
    label: "Có lỗi",
    icon: XCircle,
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "border-red-200",
  },
} as const;

type Props = {
  stats: Record<string, number>;
};

export function StatsGrid({ stats }: Props) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {Object.entries(STAT_CONFIGS).map(([key, config]) => {
        const Icon = config.icon;
        const value = stats[key] || 0;

        return (
          <div
            className={`group relative overflow-hidden rounded-xl border-2 ${config.borderColor} ${config.bgColor} p-4 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            key={config.label}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-bold text-2xl text-gray-900 transition-colors duration-200 group-hover:text-gray-800">
                  {value}
                </p>
                <p className="font-medium text-gray-600 text-sm">
                  {config.label}
                </p>
              </div>
              <div
                className={`rounded-lg p-2 ${config.bgColor} ${config.iconColor}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>

            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
          </div>
        );
      })}
    </div>
  );
}
