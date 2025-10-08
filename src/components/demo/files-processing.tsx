import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Database,
  FileText,
  Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProcessingFile } from "@/types";

type Props = {
  files: ProcessingFile[];
  selectedFile: ProcessingFile | null;
  onFileClick: (file: ProcessingFile) => void;
};

export function FilesProcessing({ files, selectedFile, onFileClick }: Props) {
  const hasCompletedFiles = files.some((f) => f.result);

  return (
    <Card className="border-0 bg-white/80 shadow-gray-500/10 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <FileText className="h-5 w-5 text-purple-600" />
          Xử Lý Files ({files.length})
        </CardTitle>
        {hasCompletedFiles && (
          <div className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="font-medium text-gray-600">
              Nhấp để xem chi tiết
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {files.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Upload className="h-6 w-6 opacity-50" />
              </div>
              <h3 className="mb-1 font-medium text-gray-600">
                Chưa có file nào
              </h3>
              <p className="text-gray-500 text-sm">
                Chọn files để tải lên hoặc decode từ assets database
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => {
              const isSelected = selectedFile?.id === file.id;
              const hasResult = Boolean(file.result);

              return (
                <button
                  className={`w-full rounded border-2 p-2 text-left transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : hasResult
                        ? "cursor-pointer border-gray-200 hover:border-blue-300 hover:shadow-md"
                        : "cursor-default border-gray-200"
                  }`}
                  disabled={!hasResult}
                  key={file.id}
                  onClick={() => hasResult && onFileClick(file)}
                  type="button"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-900 text-sm">
                        {file.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {file.size} • {file.type}
                        {file.assetId && (
                          <span className="ml-2 font-semibold text-blue-600">
                            Asset: {file.assetId}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Status Icon */}
                      {file.status === "completed" &&
                        file.result?.type === "exact_match" && (
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="font-medium text-green-700 text-xs">
                              Hoàn tất
                            </span>
                          </div>
                        )}
                      {file.status === "completed" &&
                        file.result?.type === "has_errors" && (
                          <div className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            <span className="font-medium text-orange-700 text-xs">
                              Có lỗi
                            </span>
                          </div>
                        )}
                      {file.status === "error" && (
                        <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                          <span className="font-medium text-red-700 text-xs">
                            Thất bại
                          </span>
                        </div>
                      )}
                      {file.status !== "completed" &&
                        file.status !== "error" && (
                          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
                            <div className="h-2 w-2 animate-spin rounded-full border border-blue-600 border-t-transparent" />
                            <span className="font-medium text-blue-700 text-xs">
                              Xử lý
                            </span>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* PMIS Match Info for completed files */}
                  {file.status === "completed" && file.result && (
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1">
                        <Database className="h-3 w-3 text-blue-600" />
                        <span className="text-blue-700">
                          Match:{" "}
                          {Math.round(file.result.pmisMatch.similarity * 100)}%
                        </span>
                      </div>
                      {file.result.validation.length > 0 && (
                        <div className="flex items-center gap-1 rounded bg-orange-50 px-2 py-1">
                          <AlertTriangle className="h-3 w-3 text-orange-600" />
                          <span className="text-orange-700">
                            {file.result.validation.length} vấn đề
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 rounded bg-gray-50 px-2 py-1">
                        <span className="text-gray-600">
                          OCR: {Math.round(file.result.ocrConfidence * 100)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {file.status !== "completed" && (
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span
                          className={`font-medium text-xs ${
                            file.status === "error"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {file.stage}
                        </span>
                        {file.status !== "error" && (
                          <span className="font-bold text-blue-600 text-xs">
                            {file.progress}%
                          </span>
                        )}
                      </div>
                      {file.status === "error" ? (
                        <div className="rounded bg-red-50 p-2 text-red-700 text-xs">
                          ❌{" "}
                          {file.errorMessage ||
                            "Có lỗi xảy ra trong quá trình xử lý"}
                        </div>
                      ) : (
                        <div className="h-1.5 w-full rounded-full bg-gray-200">
                          <div
                            className="h-1.5 rounded-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {file.processingTime && (
                    <div className="mt-1 text-gray-500 text-xs">
                      ⏱️ {file.processingTime}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
