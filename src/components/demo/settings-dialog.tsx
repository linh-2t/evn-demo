import { CheckCircle, Database, Edit2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatFieldName } from "@/lib/demo-utils";
import type { PmisMapping } from "@/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pmisMapping: PmisMapping;
  editingMapping: PmisMapping | null;
  onMappingEdit: (field: keyof PmisMapping, value: string) => void;
  onMappingSave: () => void;
  onEditStart: () => void;
  onEditCancel: () => void;
  onCsvUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SettingsDialog({
  open,
  onOpenChange,
  pmisMapping,
  editingMapping,
  onMappingEdit,
  onMappingSave,
  onEditStart,
  onEditCancel,
  onCsvUpload,
}: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[85vh] w-[95vw] max-w-4xl overflow-auto sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-600" />
            Cấu Hình AI & Ánh Xạ Dữ Liệu
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Data Upload Section */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* PMIS CSV Upload */}
            <Card className="border border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <label
                  className="mb-2 flex items-center gap-2 font-medium text-blue-800 text-sm"
                  htmlFor="pmis-upload"
                >
                  <Database className="h-4 w-4" />
                  Dữ Liệu PMIS (CSV)
                </label>
                <input
                  accept=".csv"
                  className="block w-full rounded-lg border border-blue-200 text-gray-700 text-xs file:mr-3 file:rounded-l-lg file:border-0 file:bg-blue-500 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-blue-600"
                  id="pmis-upload"
                  onChange={onCsvUpload}
                  type="file"
                />
                <p className="mt-2 text-blue-700 text-xs">
                  Tải lên danh sách thiết bị từ hệ thống PMIS. File CSV cần có
                  các cột: ASSETID, ASSET_NAME, NO, LOCATION, MANUFACTURER, DATE
                </p>
              </CardContent>
            </Card>

            {/* Encoded Assets Upload */}
            <Card className="border border-purple-200 bg-purple-50/50">
              <CardContent className="p-4">
                <label
                  className="mb-2 flex items-center gap-2 font-medium text-purple-800 text-sm"
                  htmlFor="assets-upload"
                >
                  <Database className="h-4 w-4" />
                  Assets Đã Mã Hóa (CSV)
                </label>
                <input
                  accept=".csv"
                  className="block w-full rounded-lg border border-purple-200 text-gray-700 text-xs file:mr-3 file:rounded-l-lg file:border-0 file:bg-purple-500 file:px-3 file:py-2 file:font-medium file:text-white hover:file:bg-purple-600"
                  id="assets-upload"
                  onChange={() => {
                    // TODO: Implement assets upload
                  }}
                  type="file"
                />
                <p className="mt-2 text-purple-700 text-xs">
                  Tải lên danh sách assets đã được mã hóa. File CSV cần có các
                  cột: ASSET_ID, NAME, STATUS, FILE_COUNT, BINARY_SIZE, FILES
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Field Mapping */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h3 className="font-medium text-gray-700 text-sm">
                <Zap className="mr-1.5 inline h-3.5 w-3.5" />
                Cấu Hình Ánh Xạ Trường Dữ Liệu
              </h3>
              {!editingMapping && (
                <Button
                  className="ml-auto text-xs"
                  onClick={onEditStart}
                  size="sm"
                  variant="outline"
                >
                  <Edit2 className="mr-1 h-3 w-3" />
                  Sửa
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(editingMapping || pmisMapping).map(
                ([field, col]) => (
                  <Card className="border bg-gray-50/50 shadow-sm" key={field}>
                    <CardContent className="p-3">
                      <div className="mb-1.5 block font-medium text-gray-700 text-xs">
                        {formatFieldName(field)}
                      </div>
                      {editingMapping ? (
                        <Input
                          className="h-8 border font-medium text-xs focus:border-blue-500"
                          onChange={(e) =>
                            onMappingEdit(
                              field as keyof PmisMapping,
                              e.target.value
                            )
                          }
                          placeholder="Tên cột PMIS"
                          type="text"
                          value={editingMapping[field as keyof PmisMapping]}
                        />
                      ) : (
                        <div className="rounded bg-blue-50 px-2 py-1">
                          <span className="font-medium text-blue-700 text-xs">
                            → {col}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {editingMapping ? (
              <>
                <Button className="flex-1" onClick={onMappingSave} size="sm">
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Lưu
                </Button>
                <Button
                  className="flex-1"
                  onClick={onEditCancel}
                  size="sm"
                  variant="outline"
                >
                  Hủy
                </Button>
              </>
            ) : (
              <Button
                className="w-full"
                onClick={() => onOpenChange(false)}
                size="sm"
              >
                Đóng
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
