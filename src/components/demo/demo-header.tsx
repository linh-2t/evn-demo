import { Binary, Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type Props = {
  mode: "upload" | "database";
  onModeChange: (mode: "upload" | "database") => void;
  onSettingsClick: () => void;
  onUploadClick: () => void;
};

export function DemoHeader({
  mode,
  onModeChange,
  onSettingsClick,
  onUploadClick,
}: Props) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/80 p-4 shadow-blue-500/10 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text font-bold text-transparent text-xl sm:text-2xl">
            EVNNPC AI - Chuẩn hóa Dữ liệu Thiết bị
          </h1>
          <p className="mt-0.5 text-gray-600 text-xs">
            OCR Thời gian thực • Đối soát PMIS • Giải mã Binary
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Mode Switch */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 font-medium text-xs transition-colors duration-200 ${
                mode === "upload" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              <span>File</span>
            </div>

            <Switch
              checked={mode === "database"}
              className="scale-110"
              onCheckedChange={(checked) =>
                onModeChange(checked ? "database" : "upload")
              }
            />

            <div
              className={`flex items-center gap-1.5 font-medium text-xs transition-colors duration-200 ${
                mode === "database" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <Binary className="h-3.5 w-3.5" />
              <span>DB</span>
            </div>
          </div>

          <div className="flex gap-2">
            {mode === "upload" && (
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium shadow-sm transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-md"
                onClick={onUploadClick}
                size="sm"
              >
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Tải File
              </Button>
            )}
            <Button
              className="font-medium shadow-sm transition-shadow duration-200 hover:shadow-md"
              onClick={onSettingsClick}
              size="sm"
              variant="outline"
            >
              <Settings className="mr-1.5 h-3.5 w-3.5" />
              Cài đặt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
