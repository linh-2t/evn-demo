import {
  AlertCircle,
  CheckCircle,
  Download,
  Edit2,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatFieldName, getConfidenceColor } from "@/lib/demo-utils";
import type { EditingRow, PmisMapping, ProcessingFile } from "@/types";

type Props = {
  selectedFile: ProcessingFile;
  editingRows: Record<string, EditingRow>;
  pmisMapping: PmisMapping;
  onRowAction: (field: string, action: string, newValue?: string) => void;
};

export function ComparisonTable({
  selectedFile,
  editingRows,
  pmisMapping,
  onRowAction,
}: Props) {
  const [editingValues, setEditingValues] = useState<Record<string, string>>(
    {}
  );

  if (!selectedFile.result?.extracted) return null;

  const handleEditStart = (field: string, currentValue: string) => {
    setEditingValues((prev) => ({ ...prev, [field]: currentValue }));
    onRowAction(field, "edit");
  };

  const handleEditSave = (field: string) => {
    const newValue = editingValues[field];
    if (newValue !== undefined) {
      onRowAction(field, "save", newValue);
      setEditingValues((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleEditCancel = (field: string) => {
    setEditingValues((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
    onRowAction(field, "approve"); // Reset to original state
  };

  return (
    <Card className="mt-6 border-0 bg-white/80 shadow-gray-500/10 shadow-lg backdrop-blur-sm">
      <CardHeader className="border-gray-100 border-b">
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Edit2 className="h-5 w-5 text-blue-600" />
          Bảng So Sánh & Thao Tác Dữ Liệu
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Trường dữ liệu
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Trích xuất được
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Độ tin cậy
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Dữ liệu PMIS
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedFile.result.extracted).map(
                ([field, data]) => {
                  const pmisValue =
                    selectedFile.result?.pmisMatch?.record?.[
                      pmisMapping[
                        field as keyof PmisMapping
                      ] as keyof typeof selectedFile.result.pmisMatch.record
                    ];
                  const isMatch = data.value === pmisValue;
                  const issue = selectedFile.result?.validation.find(
                    (i) => i.field === field
                  );
                  const rowState = editingRows[field];
                  const isEditing = rowState?.status === "editing";
                  const currentEditValue = editingValues[field];

                  return (
                    <tr
                      className={`border-b transition-colors ${
                        rowState?.status === "approved"
                          ? "bg-green-50/80"
                          : isEditing
                            ? "bg-blue-50/80"
                            : issue?.type === "error"
                              ? "bg-red-50/80"
                              : issue?.type === "warning"
                                ? "bg-yellow-50/80"
                                : "hover:bg-gray-50/80"
                      }`}
                      key={field}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatFieldName(field)}
                      </td>
                      <td className="min-w-[200px] px-4 py-3">
                        {isEditing ? (
                          <div className="rounded-lg bg-blue-50 p-2">
                            <Input
                              autoFocus
                              className="h-8 border-blue-200 bg-white text-sm focus:border-blue-400"
                              onChange={(e) =>
                                setEditingValues((prev) => ({
                                  ...prev,
                                  [field]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleEditSave(field);
                                } else if (e.key === "Escape") {
                                  handleEditCancel(field);
                                }
                              }}
                              placeholder="Nhập giá trị mới"
                              value={currentEditValue ?? data.value}
                            />
                          </div>
                        ) : (
                          <div
                            className={`rounded px-2 py-1 ${
                              issue?.type === "error"
                                ? "bg-red-50 font-semibold text-red-700"
                                : rowState?.status === "approved"
                                  ? "bg-green-50 font-semibold text-green-700"
                                  : "text-gray-900"
                            }`}
                          >
                            {rowState?.value ||
                              data.value ||
                              "Không có dữ liệu"}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={`h-full rounded-full transition-all ${getConfidenceColor(data.confidence)}`}
                              style={{ width: `${data.confidence * 100}%` }}
                            />
                          </div>
                          <span
                            className={`font-medium text-xs ${
                              data.confidence > 0.8
                                ? "text-green-600"
                                : data.confidence > 0.6
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {Math.round(data.confidence * 100)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`${isMatch ? "rounded bg-green-50 px-2 py-1 font-semibold text-green-700" : "text-gray-700"}`}
                        >
                          {String(pmisValue) || "Không có dữ liệu"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {rowState?.status === "approved" ? (
                          <div className="flex items-center justify-center gap-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium text-green-600 text-xs">
                              Đã duyệt
                            </span>
                          </div>
                        ) : isEditing ? (
                          <div className="flex items-center justify-center gap-1">
                            <Edit2 className="h-5 w-5 text-blue-500" />
                            <span className="font-medium text-blue-600 text-xs">
                              Đang chỉnh sửa
                            </span>
                          </div>
                        ) : isMatch ? (
                          <div className="flex items-center justify-center gap-1">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium text-green-600 text-xs">
                              Khớp
                            </span>
                          </div>
                        ) : issue ? (
                          issue.type === "error" ? (
                            <div className="flex items-center justify-center gap-1">
                              <XCircle className="h-5 w-5 text-red-500" />
                              <span className="font-medium text-red-600 text-xs">
                                Lỗi
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-1">
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                              <span className="font-medium text-xs text-yellow-600">
                                Cảnh báo
                              </span>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center gap-1">
                            <AlertCircle className="h-5 w-5 text-gray-400" />
                            <span className="font-medium text-gray-500 text-xs">
                              Chờ xử lý
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {isEditing ? (
                            <>
                              <Button
                                className="bg-green-600 text-white hover:bg-green-700"
                                onClick={() => handleEditSave(field)}
                                size="icon-sm"
                                title="Lưu thay đổi"
                                variant="default"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                className="text-gray-600 hover:bg-gray-50"
                                onClick={() => handleEditCancel(field)}
                                size="icon-sm"
                                title="Hủy chỉnh sửa"
                                variant="ghost"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                className={`${
                                  rowState?.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : "text-green-600 hover:bg-green-50"
                                }`}
                                disabled={rowState?.status === "approved"}
                                onClick={() => onRowAction(field, "approve")}
                                size="icon-sm"
                                title="Duyệt giá trị này"
                                variant="ghost"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                className="text-blue-600 hover:bg-blue-50"
                                onClick={() =>
                                  handleEditStart(
                                    field,
                                    rowState?.value || data.value
                                  )
                                }
                                size="icon-sm"
                                title="Chỉnh sửa giá trị"
                                variant="ghost"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

        <div className="border-gray-100 border-t bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600 text-sm">
              Tổng: {Object.keys(selectedFile.result.extracted).length} trường
              dữ liệu
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-sm hover:from-green-700 hover:to-emerald-700"
                onClick={() => {
                  // Handle update all approved
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Cập nhật tất cả đã duyệt
              </Button>
              <Button
                className="shadow-sm transition-shadow hover:shadow-md"
                onClick={() => {
                  // Handle export
                }}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Xuất dữ liệu
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
